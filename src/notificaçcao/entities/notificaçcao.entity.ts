import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Notificaçcao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  notificationText: string;

  @Column()
  tarefaId: number;

  @Column()
  usuarioId: string;

  @Column({ default: false })
  isOpen: boolean;

  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn()
  updated_At: Date;
}
