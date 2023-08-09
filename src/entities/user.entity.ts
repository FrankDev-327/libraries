import { BookEntity } from "./book.entity";
import { hashing } from "src/utils/helper";
import { BaseModelEntity } from "./base.model.entity";
import { Entity, Column, OneToOne, JoinColumn, BeforeInsert } from "typeorm"

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

    @BeforeInsert()
    async hashingPassword() {
        this.password = await hashing(this.password);
    }
}
