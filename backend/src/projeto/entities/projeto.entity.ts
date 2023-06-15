import { Tarefa } from 'src/tarefa/entities/tarefa.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Projeto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  projectName: string;

  @Column('varchar', { length: 500 })
  projecComment: string;

  @Column('date')
  projectDeadline: Date;

  @ManyToMany(() => Usuario, (usuario) => usuario.projeto)
  usuario: Usuario[];

  @OneToMany(() => Tarefa, (tarefa) => tarefa.projeto)
  tarefa: Tarefa[];

  constructor(projeto?: Partial<Projeto>) {
    this.id = projeto?.id;
    this.projectName = projeto?.projectName;
    this.projecComment = projeto?.projecComment;
    this.projectDeadline = projeto?.projectDeadline;
  }
}
