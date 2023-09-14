import { type } from 'os';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import { Projeto } from 'src/projeto/entities/projeto.entity';
import { Tarefa } from 'src/tarefa/entities/tarefa.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column()
  // @Generated('uuid')
  // uuid: string;

  // @Column('varchar', { length: 50, unique: true })
  // userLogin: string;

  @Column('varchar', { length: 500, nullable: true })
  password: string;

  @Column({ length: 100, nullable: true })
  userName: string;

  @Column({ length: 100, nullable: true })
  userLastName: string;

  @Column('varchar', { length: 50, unique: true })
  userEmail: string;

  @Column({ default: 'c', type: 'varchar', length: 1 })
  userPermission: string;

  @Column('varchar', { length: 50, nullable: true })
  userPost?: string;

  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn()
  updated_At: string;

  @DeleteDateColumn()
  deleted_At: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.usuario)
  empresa: Empresa;

  @JoinTable({ name: 'usuario_projeto' })
  @ManyToMany(() => Projeto, (projeto) => projeto.usuario, {
    cascade: true,
  })
  projeto: Projeto[];

  @JoinTable({ name: 'usuario_tarefa' })
  @ManyToMany(() => Tarefa, (tarefa) => tarefa.usuario, {
    cascade: true,
  })
  tarefa: Tarefa[];

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  @BeforeInsert()
  @BeforeUpdate()
  emailToLowerCase() {
    this.userEmail = this.userEmail.toLocaleLowerCase();
  }

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
