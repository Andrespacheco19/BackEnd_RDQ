const { Router } = require('express');
const contentController = require('../controllers/content.controller');

const routerContent = Router();

routerContent.get('/', contentController.getAllContents);
routerContent.post('/', contentController.createContent);
routerContent.put('/:id', contentController.updateContent);
routerContent.delete('/:id', contentController.deleteContent);

module.exports = routerContent;
