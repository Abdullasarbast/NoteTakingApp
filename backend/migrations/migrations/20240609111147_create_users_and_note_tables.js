exports.up = function(knex) {
    return knex.schema
      .createTable('users', function(table) {
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('email').notNullable().unique();
      })
      .createTable('note', function(table) {
        table.increments('note_id').primary();
        table.string('title').notNullable();
        table.text('note').notNullable();
        table.foreign('user_id').references('id').inTable('users');
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('note')
      .dropTableIfExists('users');
  };
  