import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 250 })
  razaoSocial: string;

  @Column('varchar', { length: 250 })
  nomeFantasia: string;

  @Column('varchar', { length: 20 })
  cpfCnpj: string;

  @OneToMany(() => Usuario, (usuario) => usuario.empresa)
  usuario: Usuario[];

  constructor(empresa?: Partial<Empresa>) {
    this.id = empresa?.id;
    this.razaoSocial = empresa?.razaoSocial;
    this.nomeFantasia = empresa?.nomeFantasia;
    this.cpfCnpj = empresa?.cpfCnpj;
  }
}
