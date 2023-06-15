import { Projeto } from 'src/projeto/entities/projeto.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tarefa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  taskName: string;

  @Column('varchar', { length: 50 })
  taskStatus: string;

  @Column('varchar', { length: 50 })
  taskPriority: string;

  @Column('date')
  taskDeadline: Date;

  @ManyToMany(() => Usuario, (usuario) => usuario.tarefa)
  usuario: Usuario[];

  @ManyToOne(() => Projeto, (projeto) => projeto.tarefa)
  projeto: Projeto;

  constructor(tarefa?: Partial<Tarefa>) {
    this.id = tarefa?.id;
    this.taskName = tarefa?.taskName;
    this.taskStatus = tarefa?.taskStatus;
    this.taskPriority = tarefa?.taskPriority;
    this.taskDeadline = tarefa?.taskDeadline;
  }
}
