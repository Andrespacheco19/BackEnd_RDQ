const { sendError, MESSAGE, sendResponseOk } = require("../others/response");
const { getByProductId, getAllProducts, newProduct, updateProduct, deleteProduct } = require("../service/productService");

module.exports = {
    async getProductById(req, res){
        try {
            const product = await getByProductId(req.params.id);

            if(!product){
                return endError(res, "Producto no encontrado", 400);
            }

            return sendResponseOk(res, product); 
            
        } catch (error) {
            return sendError(res, MESSAGE.ERROR_SERVIDOR);
        }
    },

    async getAllProducts(req, res){
        try {
            const products = await getAllProducts();
            
            return sendResponseOk(res, products); 
        } catch (error) {
            return sendError(res, MESSAGE.ERROR_SERVIDOR);
        }
    },

    async newProduct(req, res){
        try {
            const { content, typePackaging , ...packaging } = req.body;
            console.log(packaging)
            console.log(req.body);
    
            const produc = await newProduct(content, typePackaging, packaging );
    
            
            res.status(201).json({
                "success": true,
                "message": "Producto creado",
                "data": produc
            })
    
        } catch (error) {
            console.log(error)
            sendError(res, error.message, 500);
        }
    },

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const { content, typePackaging, ...packaging } = req.body;

            const updatedProduct = await updateProduct(id, content, typePackaging, packaging);
            // const updatedProduct = await updateProduct(id, content, typePackaging, packaging);

            return sendResponseOk(res, updatedProduct);
        } catch (error) {
            console.log(error);
            return sendError(res, error.message, 500);
        }
    },

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const deletedProduct = await deleteProduct(id);
            
            res.status(201).json({
                "success": true,
                "message": "Producto eliminado",
                "data": deletedProduct
            })

            // return sendResponseOk(res, deletedProduct);
        } catch (error) {
            console.log(error);
            return sendError(res, error.message, 500);
        }
    }
}