import { Empresa } from 'src/empresa/entities/empresa.entity';
import { Tarefa } from 'src/tarefa/entities/tarefa.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  projectDescription: string;

  @Column('date', { nullable: true })
  projectBeginning: Date;

  @Column('date')
  projectDeadline: Date;

  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn()
  updated_At: Date;

  @DeleteDateColumn()
  deleted_At: Date;

  @ManyToOne(() => Empresa, (empresa) => empresa.projeto)
  empresa: Empresa;

  @ManyToMany(() => Usuario, (usuario) => usuario.projeto)
  usuario: Usuario[];

  @OneToMany(() => Tarefa, (tarefa) => tarefa.projeto)
  tarefa: Tarefa[];

  // constructor(projeto?: Partial<Projeto>) {
  //   this.id = projeto?.id;
  //   this.projectName = projeto?.projectName;
  //   this.projecDescription = projeto?.projecDescription;
  //   this.projectDeadline = projeto?.projectDeadline;
  // }
}
