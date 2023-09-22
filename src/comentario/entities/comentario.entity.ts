import { Tarefa } from 'src/tarefa/entities/tarefa.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comentario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  commentText: string;

  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn()
  updated_At: Date;

  @DeleteDateColumn()
  deleted_At: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.comentario)
  usuario: Usuario;

  @ManyToOne(() => Tarefa, (tarefa) => tarefa.comentario)
  tarefa: Tarefa;
}
