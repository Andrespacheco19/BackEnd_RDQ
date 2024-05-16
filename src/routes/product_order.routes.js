const { Router } = require('express');
const productOrderController = require('../controllers/productOrder.controller');

const routerProductOrder = Router();

routerProductOrder.get('/', productOrderController.getAllProductOrders);
routerProductOrder.post('/', productOrderController.createProductOrder);
routerProductOrder.get('/:orderNumber', productOrderController.getProductOrderByOrderNumber);
routerProductOrder.put('/:orderNumber', productOrderController.updateProductOrder);
routerProductOrder.delete('/:orderNumber', productOrderController.deleteProductOrder);

module.exports = routerProductOrder;
