exports.up = function(knex) {
  return knex.schema
    .createTable('places', function (table) {
      table.increments('id');
      table.string('eng', 255);
      table.string('name', 255);
      table.string('tag', 255);
      table.string('region', 255);
      table.string('city', 255);
      table.string('difficulty', 255);
      table.string('availability', 255);
      table.string('time', 255);
      table.string('description', 255);
      table.string('coords', 255);
      table.timestamps();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('places');
};