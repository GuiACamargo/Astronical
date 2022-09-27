import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Like } from 'typeorm';
import { usuarioRepository } from '../repositories/usuarioRepository';

export class UsuarioController {
  async create(req: Request, res: Response) {
    const { nome, email, cpf, senha, cargo } = req.body;

    try {
      const cpfExiste = await usuarioRepository.findOneBy({ cpf });

      if (cpfExiste) {
        return res.status(400).json({ message: 'This CPF has already been used' });
      }

      const emailExiste = await usuarioRepository.findOneBy({ email });

      if (emailExiste) {
        return res.status(400).json({ message: 'This Email has already been used' });
      }

      const hashSenha = await bcrypt.hash(senha, 10);

      const usuario = usuarioRepository.create({ nome, email, cpf, senha: hashSenha, cargo, isAtivo: true });

      await usuarioRepository.save(usuario);

      //senha underline para ignonara a senha dentro do novo objeto
      const { senha: _, ...novoUsuario } = usuario;

      return res.status(201).json(novoUsuario);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Sever Error' });
    }
  }

  async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    const usuario = await usuarioRepository.findOneBy({ email, isAtivo: true });

    if (!usuario) {
      return res.status(404).json({ message: 'Invalid email or password' });
    }
    const verificaSenha = await bcrypt.compare(senha, usuario.senha);

    if (!verificaSenha) {
      return res.status(404).json({ message: 'Invalid email or password' });
    }
    const jwtPass = process.env.JWT_PASS;

    if (!jwtPass) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email, cargo: usuario.cargo }, jwtPass, {
      expiresIn: '8h',
    });

    return res.json({ token: token });
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const { nome, email, cpf, senha, cargo } = req.body;

    try {
      const usuario = await usuarioRepository.findOneBy({ id: Number(id), isAtivo:true });

      if (!usuario) {
        return res.status(404).json({ message: 'User do not exists' });
      }

      const hashSenha = await bcrypt.hash(senha, 10);

      const usuarioAtualizado = usuarioRepository.create({ nome, email, cpf, senha: hashSenha, cargo });

      usuarioRepository.merge(usuario, usuarioAtualizado);

      await usuarioRepository.save(usuario);

      return res.status(200).json({ message: 'Successfully updated the user' });
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
      const total = await usuarioRepository.count();

      if (!query) {
        const usuarios = await usuarioRepository.find({
          where: {
            isAtivo: true,
          },
          select: { id: true, nome: true, email: true, cargo: true },
          take,
          skip: (pages - 1) * take,
        });

        return res.send({
          usuarios,
          total,
          page,
          last_page: Math.ceil(total / take),
        });
      }

      const usuarios = await usuarioRepository.find({
        select: { id: true, nome: true, email: true, cargo: true },
        where: {
          isAtivo: true,
          nome: Like(`%${query}%`),
        },
        take,
        skip: (pages - 1) * take,
      });

      return res.send({
        usuarios,
        total,
        page,
        last_page: Math.ceil(total / take),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Sever Error' });
    }
  }

  //colocar delçao boleana
  async delete(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const usuario = await usuarioRepository.findOneBy({ id: Number(id), isAtivo: true });

      if (!usuario) {
        return res.status(404).json({ message: 'User do not exists' });
      }

      usuarioRepository.merge(usuario, { isAtivo: false });

      await usuarioRepository.save(usuario);

      return res.status(200).json({ message: `id: ${usuario.id} successfully deleted` });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const usuario = await usuarioRepository.findOneBy({
        id: Number(id), isAtivo: true
      });

      if (!usuario) {
        return res.status(404).json({ message: 'User do not exists' });
      }

      const { senha: _, ...usuariobyId } = usuario;

      return res.send(usuariobyId);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Sever Error' });
    }
  }

  async getByUserEmail(req: Request, res: Response) {
    try {
      const usuarioEmail = req.params.email;

      const usuario = await usuarioRepository.findOneBy({
        email: usuarioEmail, isAtivo: true
      });

      if (!usuario) {
        return res.status(404).json({ message: 'User do not exists' });
      }

      const { senha: _, ...usuariobyEmail } = usuario;

      return res.send(usuariobyEmail);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Sever Error' });
    }
  }
}
