import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { usuarioRepository } from '../repositories/usuarioRepository';

type JwtPayload = {
  id: number;
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const token = authorization.split(' ')[1];

    const jwtPass = process.env.JWT_PASS;

    if (!jwtPass) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    const { id } = jwt.verify(token, jwtPass) as JwtPayload;

    const usuario = await usuarioRepository.findOneBy({ id });

    if (!usuario) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const { senha, ...usuarioLogado } = usuario;

    req.user = usuarioLogado;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
