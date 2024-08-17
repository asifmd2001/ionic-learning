const setupRoutes = (app, { users }) => {

  app.get('/health', (req, res) => {
    res.send('<h2>Server is up and running...!</h2>');
  });

  app.get('/users', async (req, res) => {
    const data = await users.all();
    res.send({ data });
  });

  app.get('/users/:id', async (req, res) => {
    const data = await users.findById(req.params.id);
    res.send({ data });
  });

  app.post('/users', async (req, res) => {
    const data = await users.create(req.body);
    res.send({ data });
  });

  app.put('/users/:id', async (req, res) => {
    console.log(req.body)
    const data = await users.update(req.params.id, req.body);
    res.send({ data });
  });

  app.delete('/users/:id', async (req, res) => {
    const data = await users.remove(req.params.id);
    res.send({ data });
  });

};

module.exports = setupRoutes;
