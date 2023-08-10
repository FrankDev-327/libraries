import { Entity, Column } from "typeorm"
import { BaseModelEntity } from "./base.model.entity";

@Entity("books")
export class BookEntity extends BaseModelEntity {
    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    publisher: string;
}
