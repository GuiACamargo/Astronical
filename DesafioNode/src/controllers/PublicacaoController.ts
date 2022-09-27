import { Request, Response } from 'express';
import { Like } from 'typeorm';
import { publicacaoRepository } from '../repositories/publicacaoRepository';
import { usuarioRepository } from '../repositories/usuarioRepository';
import { Publicacao } from './../entities/Publicacao';

export class PublicacaoController {
  async create(req: Request, res: Response) {
    try {
      const { titulo, descricao, pontuacao, usuarioId } = req.body;

      if (!titulo) {
        return res.status(400).json({ message: 'A title is required' });
      }

      const usuario = await usuarioRepository.findOneBy({
        id: Number(usuarioId), isAtivo: true
      });

      if (!usuario) {
        return res.status(404).json({ message: 'User do not exists' });
      }

      const publicacao = new Publicacao();
      publicacao.usuario = usuario;
      publicacao.titulo = titulo;
      publicacao.descricao = descricao;
      publicacao.pontuacao = pontuacao;
      publicacao.isAtivo = true;

      await publicacaoRepository.save(publicacao);

      return res.status(201).json({ message: 'Post sucessfully created' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async listAll(req: Request, res: Response) {
    try {
      const { query, page } = req.query;

      const pages: number = Number(page) || 1;
      const take = 10;
      const total = await publicacaoRepository.count();

      if (!query) {
        const publicacoes = await publicacaoRepository.find({
          relations: { usuario: true },
          select: { usuario: { id: true, nome: true, email: true } },
          where: {
            isAtivo: true,
            usuario: { isAtivo: true }
          },
          take,
          skip: (pages - 1) * take,
        });

        return res.send({
          publicacoes,
          total,
          page,
          last_page: Math.ceil(total / take),
        });
      }

      const publicacoes = await publicacaoRepository.find({
        relations: { usuario: true },
        select: { usuario: { id: true, nome: true, email: true } },
        where: {
          isAtivo: true,
          titulo: Like(`%${query}%`),
          usuario: { isAtivo: true }
        },
        take,
        skip: (pages - 1) * take,
      });

      return res.send({
        publicacoes,
        total,
        page,
        last_page: Math.ceil(total / take),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Sever Error' });
    }
  }

  async listByUserId(req: Request, res: Response) {
    try {
      const usuarioId = req.params.id;

      const usuario = await usuarioRepository.findOneBy({
        id: Number(usuarioId), isAtivo: true
      });

      if (!usuario) {
        return res.status(404).json({ message: 'User do not exists' });
      }

      const publicacoes = await publicacaoRepository.find({
        relations: { usuario: true },
        select: { usuario: { id: true, nome: true, email: true } },
        where: {
          isAtivo: true,
          usuario: { id: Number(usuarioId) },
        },
      });

      return res.send({
        publicacoes
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Sever Error' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const publicacaoId = req.params.id;

      const publicacoes = await publicacaoRepository.find({
        relations: { usuario: true },
        select: { usuario: { id: true, nome: true, email: true } },
        where: {
          id: Number(publicacaoId),
          isAtivo: true,
        },
      });

      if (!publicacoes || publicacoes.length === 0) {
        return res.status(404).json({ message: 'This Post do not exists' });
      }

      return res.send({
        publicacoes,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Sever Error' });
    }
  }

  async update(req: Request, res: Response) {
    const publicacaoId = req.params.id;

    const { titulo, descricao, pontuacao } = req.body;

    try {
      const publicacao = await publicacaoRepository.findOneBy({
        id: Number(publicacaoId), isAtivo: true
      });

      if (!publicacao) {
        return res.status(404).json({ message: 'This Post do not exists' });
      }

      const publicacaoAtualizada = publicacaoRepository.create({
        titulo,
        descricao,
        pontuacao: Number(pontuacao),
      });

      publicacaoRepository.merge(publicacao, publicacaoAtualizada);

      await publicacaoRepository.save(publicacao);

      return res.status(200).json(publicacao);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const publicacao = await publicacaoRepository.findOneBy({ id: Number(id), isAtivo: true });

      if (!publicacao) {
        return res.status(404).json({ message: 'This Post do not exists' });
      }

      publicacaoRepository.merge(publicacao, { isAtivo: false });

      await publicacaoRepository.save(publicacao);

      return res.status(200).json({ message: `id: ${publicacao.id} succesfully deleted` });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
