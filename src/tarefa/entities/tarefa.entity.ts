import { Projeto } from 'src/projeto/entities/projeto.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tarefa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column('varchar', { length: 100 })
  taskName: string;

  @Column('varchar', { length: 50, default: 'A fazer' })
  taskStatus: string;

  @Column('varchar', { length: 50 })
  taskPriority: string;

  @Column('date')
  taskDeadline: Date;

  @Column({ type: 'boolean', default: false, nullable: true })
  isDone: boolean;

  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn()
  updated_At: string;

  @DeleteDateColumn()
  deleted_At: string;

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
