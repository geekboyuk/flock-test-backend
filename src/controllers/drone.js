const { logger } = require('../services');

const droneController = (api) => ({
  getOne: async (req, res) => {
    try {
      const { id } = req.params;

      const drone = await api.get(id);
      res.send(drone);
    } catch (err) {
      // The cache returns range errors if key not found
      if (err instanceof RangeError) {
        res.sendStatus(404);
      } else {
        console.error(err);
        logger.error('Controller getOne', err);
    
        res.sendStatus(500);
      }
    }
  },
  getAll: async (req, res) => {
    try {
      const drones = await api.all();

      res.header('X-Total-Count', Object.keys(drones).length);
  
      res.send(drones);
    } catch (err) {
      console.error(err);
      logger.error('Controller getAll', err);
  
      res.sendStatus(500);
    }
  }
});

module.exports = droneController;
