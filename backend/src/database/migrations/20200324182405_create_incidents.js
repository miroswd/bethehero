
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table){
    table.increments(); // id++
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    // relacionamento
    table.string('ong_id').notNullable();

    table.foreign('ong_id').references('id').inTable('ongs'); // chave estrangeira
  })
};

exports.down = function(knex) {
  // E se der algum problema, preciso desfazer o que eu fiz
  return knex.schema.dropTable('incidents')
};
