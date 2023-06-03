import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await prisma.product.findFirst({
      where: { id: Number(productId) },
      include: { 
        category : true, 
        productImages : true 
      },
    });
    return res.status(200).send({
      product
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
    try {
      const products = await prisma.product.findMany({
        include: { 
          category : true, 
          productImages : true 
        },
      });
      return res.status(200).send({
        products
      });
    } catch (err) {
      return res.status(500).send({
        message: 'ups, server error',
        error: err
      });
    }
  };
  
  export const createProduct = async (req: Request, res: Response) => {
    try {

      if (!req.files || !Array.isArray(req.files)) {
        return res.status(400).json({ 
          message: 'problems with the req.file' 
        });
      }
    
      const images = req.files.map((file: Express.Multer.File) => {
        return{ url: file.path}
      });

      const { name, description, price, stock, categoryId } = req.body;

      const newProduct = await prisma.product.create({
        data: { name, 
          description, 
          price : Number(price), 
          stock : Number(stock), 
          categoryId : Number (categoryId),
          productImages: {create : images}
         },
      });

      return res.status(200).send({
        message: 'Product created successfully',
        newProduct
      });
        
    } catch (err) {
      return res.status(500).send({
        message: 'ups, server error',
        error: err
      });
    }
  };
  
  export const updateProduct = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const { name, description, price, stock, categoryId } = req.body;
      const productUpdate = await prisma.product.update({
        where: { id: Number(productId) },
        data: { name, description, price, stock, categoryId }
      });
      return res.status(200).send({
        message: 'product updated successfully',
        productUpdate
      });
    } catch (err) {
      return res.status(500).send({
        message: 'ups, server error',
        error: err
      });
    }
  };
  
  export const deleteProduct = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      await prisma.product.delete({
        where: { id: Number(productId) }
      });
      return res.status(200).send({
        message: 'product deleted successfully'
      });
    } catch (err) {
      return res.status(500).send({
        message: 'ups, server error',
        error: err
      });
    }
  };