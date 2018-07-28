
const initialise = (app, controllers) => {
  app.get('/api/drones/:id', controllers.drone.getOne);
  app.get('/api/drones', controllers.drone.getAll);
};

module.exports = {
  initialise,
};