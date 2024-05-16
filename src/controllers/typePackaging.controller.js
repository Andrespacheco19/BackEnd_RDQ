const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sendError, MESSAGE } = require("../others/errors");

const getAllTypePackaging = async (req, res) => {
  try {
    const typePackagings = await prisma.typePackaging.findMany();
    res.status(200).json({
      success: true,
      data: typePackagings,
    });
  } catch (error) {
    return sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
  }
};

const createTypePackaging = async (req, res) => {
  try {
    const typePackagingData = req.body;
    const newTypePackaging = await prisma.typePackaging.create({
      data: typePackagingData,
    });
    res.status(201).json({
      success: true,
      data: newTypePackaging,
      message: "Tipo de packaging creado exitosamente",
    });
  } catch (error) {
    return sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
  }
};

const updateTypePackaging = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedTypePackaging = await prisma.typePackaging.update({
      where: { id_type_packaging: id },
      data: updatedData,
    });
    res.status(200).json({
      success: true,
      data: updatedTypePackaging,
      message: "Tipo de packaging actualizado exitosamente",
    });
  } catch (error) {
    return sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
  }
};

const deleteTypePackaging = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.typePackaging.delete({
      where: { id_type_packaging: id },
    });
    res.status(200).json({
      success: true,
      message: "Tipo de packaging eliminado exitosamente",
    });
  } catch (error) {
    return sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
  }
};

module.exports = {
  getAllTypePackaging,
  createTypePackaging,
  updateTypePackaging,
  deleteTypePackaging,
};
