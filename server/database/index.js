const knex = require('knex');
const knexConfig = require('../knexfile.js');

const database = knex(knexConfig.development);

module.exports = database;
