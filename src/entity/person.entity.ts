import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Products } from './product.entity';

@Entity()
export class Persons {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: false })
  email: string;

  @Column('text', { nullable: false })
  password: string;

  @Column({ default: false })
  is_banned: boolean;

  @OneToMany(() => Products, (product) => product.person)
  product: Products[];

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
