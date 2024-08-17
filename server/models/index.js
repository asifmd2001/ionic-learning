const UsersModal = require('./users');

const setupModels = db => {
  const models = {
    users: new UsersModal(db),
  };

  // allows a model instance to access other model instances
  Object.values(models).forEach(model => {
    model.models = models;
  });

  return models;
};

module.exports = setupModels;
