import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomRequest } from '../utilities/models';

const prisma = new PrismaClient();

export const addToCart = async (req: CustomRequest, res: Response) => {
  try {
    const { productId } =  req.params;
    const clientId = Number(req.user?.id);
    if (!productId)
      return res.status(400).send({
        message: 'Missing param productId'
      });
    if (!clientId)
      return res.status(400).send({
        message: 'Missing param clientId'
      });
    const existInCart = await prisma.cart.findFirst({
      where: { clientId, productId : Number(productId) }
    });
    if (existInCart) {
      const addProduct = await prisma.cart.update({
        where: { id: existInCart.id },
        data: {
          productId : Number(productId),
          clientId,
          quantity: existInCart.quantity + 1
        }
      });
      return res.status(200).send({
        message: 'product added successfully',
        addProduct
      });
    } else {
      const addProduct = await prisma.cart.create({
        data: {
          productId : Number(productId),
          clientId
        }
      });
      return res.status(200).send({
        message: 'product added successfully',
        addProduct
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      err
    });
  }
};

export const removeToCart = async (req: CustomRequest, res: Response) => {
  try {
    const { productId}  = req.params;
    const clientId = Number(req.user?.id);
    if (!productId || !clientId)
      return res.status(400).send({
        message: 'Missing param: clientId or productId'
      });
    const existInCart = await prisma.cart.findFirst({
      where: { productId : Number(productId), clientId }
    });
    if (!existInCart)
      return res.status(400).send({
        message: 'that product doesnt exist in your cart'
      });
    if (existInCart.quantity == 1) {
      await prisma.cart.delete({
        where: { id: existInCart.id }
      });
      return res.status(200).send({
        message: 'Product deleted',
      });
    } if (existInCart.quantity > 1) {
      const quantityUpdate = existInCart.quantity - 1
      const productUpdate = await prisma.cart.update({
        where: { id: existInCart.id },
        data: {
          quantity: quantityUpdate
        },
      });
      return res.status(200).send({
        message: 'Product deleted',
        productUpdate
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      err
    });
  }
};

export const getCart = async (req: CustomRequest, res: Response) => {
  try {
    const clientId = Number(req.user?.id);
    if (!clientId) {
      return res.status(404).send({
        message: 'Missing param id'
      });
    }
    const clientCart = await prisma.cart.findMany({
      where: { clientId },
      include: { product: true }
    });
    if (!clientCart) {
      return res.status(404).send({
        message: 'your cart is empty'
      });
    }
    const client = await prisma.client.findFirst({
      where: { id: clientId }
    });
    const clientName = client?.name;
    res.status(200).send({
      user: clientName,
      clientCart
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      err
    });
  }
};
