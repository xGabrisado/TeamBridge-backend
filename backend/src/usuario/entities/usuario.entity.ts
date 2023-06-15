import { Empresa } from 'src/empresa/entities/empresa.entity';
import { Projeto } from 'src/projeto/entities/projeto.entity';
import { Tarefa } from 'src/tarefa/entities/tarefa.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  userLogin: string;

  @Column('varchar', { length: 50 })
  userPassword: string;

  @Column('varchar', { length: 50 })
  userName: string;

  @Column('varchar', { length: 50 })
  userEmail: string;

  @Column('varchar', { length: 1 })
  userPermission: string;

  @Column('varchar', { length: 50 })
  userPost: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.usuario)
  empresa: Empresa;

  @JoinTable()
  @ManyToMany(() => Projeto, (projeto) => projeto.usuario)
  projeto: Projeto[];

  @JoinTable()
  @ManyToMany(() => Tarefa, (tarefa) => tarefa.usuario)
  tarefa: Tarefa[];

  constructor(usuario?: Partial<Usuario>) {
    this.id = usuario?.id;
    this.userLogin = usuario?.userLogin;
    this.userPassword = usuario?.userPassword;
    this.userName = usuario?.userName;
    this.userEmail = usuario?.userEmail;
    this.userPermission = usuario?.userPermission;
    this.userPost = usuario?.userPost;
  }
}
