import { type } from 'os';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import { Projeto } from 'src/projeto/entities/projeto.entity';
import { Tarefa } from 'src/tarefa/entities/tarefa.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column('varchar', { length: 50, unique: true })
  userLogin: string;

  @Column('varchar', { length: 50 })
  userPassword: string;

  @Column('varchar', { length: 100, nullable: true })
  userName: string;

  @Column('varchar', { length: 50, unique: true })
  userEmail: string;

  @Column({ default: 'c', type: 'varchar', length: 1 })
  userPermission: string;

  @Column('varchar', { length: 50 })
  userPost: string;

  @ManyToOne(() => Empresa, empresa => empresa.usuario)
  empresa: Empresa;

  @JoinTable()
  @ManyToMany(() => Projeto, projeto => projeto.usuario)
  projeto: Projeto[];

  @JoinTable()
  @ManyToMany(() => Tarefa, tarefa => tarefa.usuario)
  tarefa: Tarefa[];

  // constructor(usuario?: Partial<Usuario>) {
  //   this.id = usuario?.id;
  //   this.userLogin = usuario?.userLogin;
  //   this.userPassword = usuario?.userPassword;
  //   this.userName = usuario?.userName;
  //   this.userEmail = usuario?.userEmail;
  //   this.userPermission = usuario?.userPermission;
  //   this.userPost = usuario?.userPost;
  // }
}
