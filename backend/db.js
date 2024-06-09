import knex from 'knex';

const db = knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'note_app'
  }
});

export default db;
