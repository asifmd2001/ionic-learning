class Model {
  constructor (db) {
    this.db = db;
  }

  get models () {
    return this._models;
  }

  set models (models) {
    this._models = models;
  }
}

module.exports = Model;
