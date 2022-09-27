import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './Usuario';

@Entity('publicacoes')
export class Publicacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  titulo: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ type: 'int' })
  pontuacao: number;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  data: Date;

  @Column({ type: 'boolean' })
  isAtivo: boolean;

  @ManyToOne(() => Usuario, (usuario) => usuario.publicacoes)
  usuario?: Usuario;
}
