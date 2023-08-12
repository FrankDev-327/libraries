import { BookEntity } from './book.entity';
import { hashing } from '../utils/helper';
import { BaseModelEntity } from './base.model.entity';
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  AfterUpdate,
  BeforeUpdate,
} from 'typeorm';

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

  @Column()
  role: string;

  @Column({
    default: true,
  })
  active: boolean;

  @OneToOne(() => BookEntity, {
    createForeignKeyConstraints: false
  })
  @JoinColumn({ name: 'book_id' })
  book: BookEntity;

  /*   @BeforeUpdate()
  async hashingNewPassword() {
    this.password = await hashing(this.password);
  }

  @BeforeInsert()
  async hashingPassword() {
    this.password = await hashing(this.password);
  } */
}
