const screenServices = require("../services/screen.services")


exports.splache_screen = (req, res) => {
    const messageScreen = screenServices.splache_screen();
    res.status(200).send({
        message: messageScreen
    });
  };