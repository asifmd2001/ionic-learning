exports.up = knex => {
    return knex.schema.createTable('users', table => {
        table.increments();
        table.string('name').notNullable();
        table.string('phone').notNullable();
        table.timestamp('entryTime').notNullable();
        table.timestamp('exitTime').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = knex => {
    return knex.schema.dropTableIfExists('users');
};
