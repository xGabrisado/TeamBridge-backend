import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notificaçcao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tarefaId: number;
}
