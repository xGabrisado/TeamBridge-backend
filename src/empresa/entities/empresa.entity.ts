import { Projeto } from 'src/projeto/entities/projeto.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column('varchar', { length: 250, unique: true })
  razaoSocial: string;

  @Column('varchar', { length: 250 })
  nomeFantasia: string;

  @Column('varchar', { length: 20, unique: true })
  cpfCnpj: string;

  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn()
  updated_At: Date;

  @DeleteDateColumn()
  deleted_At: Date;

  // eslint-disable-next-line prettier/prettier
  @OneToMany(() => Usuario, (usuario) => usuario.empresa)
  usuario: Usuario[];

  @OneToMany(() => Projeto, (usuario) => usuario.empresa)
  projeto: Projeto[];

  // constructor(empresa?: Partial<Empresa>) {
  //   this.id = empresa?.id;
  //   this.razaoSocial = empresa?.razaoSocial;
  //   this.nomeFantasia = empresa?.nomeFantasia;
  //   this.cpfCnpj = empresa?.cpfCnpj;
  // }
}
