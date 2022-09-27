import { AppDataSource } from '../data-source';
import { Publicacao } from '../entities/Publicacao';

export const publicacaoRepository = AppDataSource.getRepository(Publicacao);
