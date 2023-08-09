import { BookEntity } from "./book.entity";
import { Entity, Column, OneToOne, JoinColumn } from "typeorm"
import { BaseModelEntity } from "./base.model.entity";

@Entity('users')
export class UserEntity extends BaseModelEntity {
    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @OneToOne(() => BookEntity)
    @JoinColumn({name:'book_id'})
    book: BookEntity;
}
