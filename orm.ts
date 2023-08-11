import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";

export const typeormConfig: PostgresConnectionOptions = {
    type: 'postgres',
    url:  process.env.DB_URL,
    ssl: true,
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    subscribers:[],
    logging: true
}