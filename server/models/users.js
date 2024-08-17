const Model = require('./base');
const TableName = "users"

class UsersModel extends Model {
  all () {
    return this.db.table(TableName).select("*")
    .orderBy('entryTime', 'desc')
  }

  async create (params) {
    const id = await this.db.table(TableName).insert(params);
    return this.findById(id);
  }

  async findById (id) {
    const [contact] = await this.db.table(TableName).select('*').where({ id });
    return contact;
  }

  async remove (id) {
    const contact = await this.findById(id);
    await this.db.table(TableName).where({ id }).del();
    return contact;
  }

  async update (id, params) {
    await this.db.table(TableName).where({ id }).update(params);
    return this.findById(id);
  }
}

module.exports = UsersModel;
