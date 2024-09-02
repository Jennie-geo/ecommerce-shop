import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Persons } from './person.entity';
import { Admin } from './admin.entity';
import { Status } from '../enum/product.enum';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ManyToOne(() => Persons, (person) => person.product)
  @JoinColumn({ name: 'person_id' })
  person: Persons;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'text', nullable: false })
  image: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ default: 'pending' })
  status: Status;

  @ManyToOne(() => Admin, (admin) => admin.products)
  @JoinColumn({ name: 'admins_id' })
  admin: Admin;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
