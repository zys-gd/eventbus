export = {
    type: 'mysql',
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    debug: false,
    synchronize: false,
    entities: [__dirname + '/src/entities/*.entity.ts'],
    migrations: [__dirname + '/src/migrations/*.ts'],
    cli: {
        migrationsDir: 'apps/api/src/migrations',
        entitiesDir: 'apps/api/src/entities',
    },
};
