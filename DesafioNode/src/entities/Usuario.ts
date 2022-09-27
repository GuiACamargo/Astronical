import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Publicacao } from './Publicacao';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256 })
  nome: string;

  @Column({ type: 'varchar', length: 60, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 16, unique: true })
  cpf: string;

  @Column({ type: 'varchar', length: 256 })
  senha: string;

  @Column({ type: 'varchar', length: 16 })
  cargo: string;

  @Column({ type: 'boolean' })
  isAtivo: boolean;

  @OneToMany(() => Publicacao, (publicacao) => publicacao.usuario)
  publicacoes: Publicacao[];
}
