const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Función para obtener todos los packagings
const getAllPackagings = async (req, res) => {
  try {
    const packagings = await prisma.packaging.findMany();
    res.json(packagings);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Función para obtener un packaging por su ID
const getPackagingById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const packaging = await prisma.packaging.findUnique({
      where: { id_packaging: id },
    });
    if (!packaging) {
      return res.status(404).json({ error: 'Packaging not found' });
    }
    res.json(packaging);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Función para crear un nuevo packaging
const createPackaging = async (req, res) => {
  const { hydrostatic_date, stock, supplier, idContent, idTypePackaging } = req.body;
  try {
    const packaging = await prisma.packaging.create({
      data: {
        hydrostatic_date,
        stock,
        supplier,
        idContent,
        idTypePackaging,
      },
    });
    res.status(201).json(packaging);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Función para actualizar un packaging
const updatePackaging = async (req, res) => {
  const id = parseInt(req.params.id);
  const { hydrostatic_date, stock, supplier, idContent, idTypePackaging } = req.body;
  try {
    const updatedPackaging = await prisma.packaging.update({
      where: { id_packaging: id },
      data: {
        hydrostatic_date,
        stock,
        supplier,
        idContent,
        idTypePackaging,
      },
    });
    res.json(updatedPackaging);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Función para eliminar un packaging
const deletePackaging = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.packaging.delete({
      where: { id_packaging: id },
    });
    res.json({ message: 'Packaging deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllPackagings,
  getPackagingById,
  createPackaging,
  updatePackaging,
  deletePackaging,
};
