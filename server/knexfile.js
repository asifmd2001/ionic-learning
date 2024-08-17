// NB: no need to tinker here
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/dev.sqlite3'
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    useNullAsDefault: true,
  },
};
