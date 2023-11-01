import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Notificacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  notification_text: string;

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

  @DeleteDateColumn()
  deleted_at: Date;
}
