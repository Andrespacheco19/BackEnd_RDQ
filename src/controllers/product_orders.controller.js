

/*AQUI DEJO ESTO ADELANTADO, MIRA SI LO CONTINUAS*/ 

const prisma = require("../config/prisma");
const { sendError, MESSAGE } = require("../others/errors");

module.exports = {
  async getAllProductOrders(req, res) {
    try {
      const productOrders = await prisma.product_order.findMany();
      res.status(200).json({
        success: true,
        data: productOrders,
      });
    } catch (error) {
      return sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
    }
  },

  async createProductOrder(req, res) {
    try {
      const productOrder = req.body;

      const newProductOrder = await prisma.product_order.create({
        data: productOrder,
      });

      res.status(201).json({
        success: true,
        data: newProductOrder,
        message: "Orden de producto creada",
      });
    } catch (error) {
      return sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
    }
  },

  async getProductOrderByOrderNumber(req, res) {
    try {
      const orderNumber = parseInt(req.params.orderNumber);
      const productOrder = await prisma.product_order.findFirst({
        where: { order_number: orderNumber },
      });

      if (!productOrder) {
        return res.status(404).json({
          success: false,
          message: "Orden de producto no encontrada",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Orden de producto encontrada",
        data: productOrder,
      });
    } catch (error) {
      return sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
    }
  },

  async updateProductOrder(req, res) {
    try {
      const newProductOrderData = req.body;
      const orderNumber = parseInt(req.params.orderNumber);

      const productOrder = await prisma.productOrder.findFirst({
        where: { order_number: orderNumber },
      });

      if (!productOrder) {
        return res.status(404).json({
          success: false,
          message: "Orden de producto no encontrada",
        });
      }

      const updatedProductOrder = await prisma.productOrder.update({
        where: { order_number: orderNumber },
        data: newProductOrderData,
      });

      res.status(200).json({
        success: true,
        message: "Orden de producto actualizada",
      });
    } catch (error) {
      return sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
    }
  },

  async deleteProductOrder(req, res) {
    try {
      const orderNumber = parseInt(req.params.orderNumber);

      const productOrder = await prisma.product_order.findFirst({
        where: { order_number: orderNumber },
      });

      if (!productOrder) {
        return res.status(404).json({
          success: false,
          message: "Orden de producto no encontrada",
        });
      }

      await prisma.product_order.delete({
        where: { order_number: orderNumber },
      });

      return res.status(200).json({
        success: true,
        message: "Orden de producto eliminada",
      });
    } catch (error) {
      return sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
    }
  },
};
