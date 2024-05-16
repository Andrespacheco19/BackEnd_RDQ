const { Router } = require('express');
const packagingController = require('../controllers/packaging.controller');
const multer = require('../config/multer');

const routerPackaging = Router();

routerPackaging.get('/', packagingController.getAllPackagings);
routerPackaging.get('/:id', packagingController.getPackagingById);
routerPackaging.post('/', multer.single('image'), packagingController.createPackaging);
routerPackaging.put('/:id', multer.single('image'), packagingController.updatePackaging);
routerPackaging.delete('/:id', packagingController.deletePackaging);

module.exports = routerPackaging;
