import { BookEntity } from "src/entities/book.entity";
import { UserEntity } from "src/entities/user.entity";
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";

export const typeormConfig: PostgresConnectionOptions = {
    type: 'postgres',
    url:  process.env.DB_URL,
    ssl: true,
    synchronize: true,
    entities: [
        BookEntity,
        UserEntity
    ],
    subscribers:[],
    logging: true
}