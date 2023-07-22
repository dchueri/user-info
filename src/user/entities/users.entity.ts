import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class User {

  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column({ type: 'varchar', width: 200 })
  name: string;
  @Column({ type: 'varchar', width: 100 })
  email: string;
  @Column({ type: 'varchar', width: 20 })
  @Column({ type: 'varchar', width: 200 })
  password: string;
  @Column({ type: 'date' })
  birthDate: Date;
  @Column({ type: 'boolean', default: true })
  isActive: boolean;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date | null;
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
