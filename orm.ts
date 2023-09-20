import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";

export const typeormConfig: PostgresConnectionOptions = {
    type: 'postgres',
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB,
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    subscribers:[],
    logging: true
}