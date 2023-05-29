import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const category = await prisma.category.findFirst({
      where: { id: Number(categoryId) },
      include: { product : true }
    });
    return res.status(200).send({
      category
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      include: { product : true }
    });
    return res.status(200).send({
      categories
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newCategory = await prisma.category.create({
      data: { name }
    });
    return res.status(200).send({
      message: 'Product created successfully',
      newCategory
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    const categoryUpdate = await prisma.category.update({
      where: { id: Number(categoryId) },
      data: { name }
    });
    return res.status(200).send({
      message: 'product updated successfully',
      categoryUpdate
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    await prisma.category.delete({
      where: { id: Number(categoryId) }
    });
    return res.status(200).send({
      message: 'category deleted successfully'
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};
