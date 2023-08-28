import { Entity, Column, OneToOne, JoinColumn, Index } from 'typeorm';
import { BookEntity } from './book.entity';
import { BaseModelEntity } from './base.model.entity';

@Entity('users')
export class UserEntity extends BaseModelEntity {
  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Index()
  @Column()
  role: string;

  @Column({
    default: true,
  })
  active: boolean;

  @OneToOne(() => BookEntity, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'book_id' })
  book: BookEntity;
}
