import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

class CategoryController {
  private prisma : PrismaClient;

  constructor() {
    this.prisma = new PrismaClient
  }

  getCategoryById = async (req: Request, res: Response) => {
    try {
      const { categoryId } = req.params;
      const category = await this.prisma.category.findFirst({
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

  getCategories = async (req: Request, res: Response) => {
    try {
      const categories = await this.prisma.category.findMany({
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

  createCategory = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const newCategory = await this.prisma.category.create({
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

  updateCategory = async (req: Request, res: Response) => {
    try {
      const { categoryId } = req.params;
      const { name } = req.body;
      const categoryUpdate = await this.prisma.category.update({
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

  deleteCategory = async (req: Request, res: Response) => {
    try {
      const { categoryId } = req.params;
      await this.prisma.category.delete({
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
}

const categoryController = new CategoryController();
export default categoryController
