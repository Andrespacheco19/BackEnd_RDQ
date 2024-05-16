const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sendError, MESSAGE } = require("../others/errors");

const getAllContents = async (req, res) => {
  try {
    const contents = await prisma.content.findMany();
    res.status(200).json({
      success: true,
      data: contents,
    });
  } catch (error) {
    return sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
  }
};

const createContent = async (req, res) => {
  try {
    const contentData = req.body;
    const newContent = await prisma.content.create({
      data: contentData,
    });
    res.status(201).json({
      success: true,
      data: newContent,
      message: "Contenido creado exitosamente",
    });
  } catch (error) {
    return sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
  }
};

const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedContent = await prisma.content.update({
      where: { id_content: id },
      data: updatedData,
    });
    res.status(200).json({
      success: true,
      data: updatedContent,
      message: "Contenido actualizado exitosamente",
    });
  } catch (error) {
    return sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
  }
};

const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.content.delete({
      where: { id_content: id },
    });
    res.status(200).json({
      success: true,
      message: "Contenido eliminado exitosamente",
    });
  } catch (error) {
    return sendError(res, MESSAGE.ERROR_SERVIDOR, 500);
  }
};

module.exports = {
  getAllContents,
  createContent,
  updateContent,
  deleteContent,
};
