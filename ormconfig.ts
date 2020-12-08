export = {
    type: 'mysql',
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    debug: false,
    synchronize: false,
    entities: [__dirname + '/src/common/entities/*.entity.ts'],
    migrations: [__dirname + '/src/common/migrations/*.ts'],
    cli: {
        migrationsDir: 'src/common/migrations',
        entitiesDir: 'src/common/entities',
    },
};
