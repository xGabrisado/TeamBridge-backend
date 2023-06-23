import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
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

  // eslint-disable-next-line prettier/prettier
  @OneToMany(() => Usuario, usuario => usuario.empresa)
  usuario: Usuario[];

  constructor(empresa?: Partial<Empresa>) {
    this.id = empresa?.id;
    this.razaoSocial = empresa?.razaoSocial;
    this.nomeFantasia = empresa?.nomeFantasia;
    this.cpfCnpj = empresa?.cpfCnpj;
  }
}
