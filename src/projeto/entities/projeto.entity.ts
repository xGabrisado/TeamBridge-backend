import { Tarefa } from 'src/tarefa/entities/tarefa.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Projeto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column('varchar', { length: 100 })
  projectName: string;

  @Column('text', { nullable: true })
  projecDescription: string;

  @Column('date')
  projectDeadline: Date;

  @CreateDateColumn()
  created_At: Date;

  @ManyToMany(() => Usuario, usuario => usuario.projeto)
  usuario: Usuario[];

  @OneToMany(() => Tarefa, tarefa => tarefa.projeto)
  tarefa: Tarefa[];

  // constructor(projeto?: Partial<Projeto>) {
  //   this.id = projeto?.id;
  //   this.projectName = projeto?.projectName;
  //   this.projecDescription = projeto?.projecDescription;
  //   this.projectDeadline = projeto?.projectDeadline;
  // }
}
