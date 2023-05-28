const { Router } = require('express');

const { reportController } = require('../controllers');

const reportRouter = Router();

reportRouter.get('/', reportController.getReports);

module.exports = reportRouter;