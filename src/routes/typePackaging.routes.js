const { Router } = require('express');
const typePackagingController = require('../controllers/typePackaging.controller');

const routerTypePackaging = Router();

routerTypePackaging.get('/', typePackagingController.getAllTypePackaging);
routerTypePackaging.post('/', typePackagingController.createTypePackaging);
routerTypePackaging.put('/:id', typePackagingController.updateTypePackaging);
routerTypePackaging.delete('/:id', typePackagingController.deleteTypePackaging);

module.exports = routerTypePackaging;
