## Setup
1. `cd` to the `server-node` directory
2. `npm i`
3. `npm run migrate`
4. `npm run seed`
5. `npm start`

## Operations
Add a new table:
`npm run knex migrate:make table_name_here`

Seed data (seeds will run in sequential order, 001, 002, etc.):
`npm run knex seed:make 002-table_name_here`
