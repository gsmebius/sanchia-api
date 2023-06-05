import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomRequest } from '../utilities/models';

class OrderController {
  private prisma : PrismaClient;

  constructor() {
    this.prisma = new PrismaClient
  };

  createOrder = async (req: CustomRequest, res: Response) => {
    const clientId = Number(req.user?.id);
    if (!clientId) {
      return res.status(404).send({
        message: 'you most SignIn'
      });
    }
    try {
      const getCart = await this.prisma.cart.findMany({
        where: { clientId },
        include: { product: true }
      });
      if (!getCart)
        return res.status(404).send({
          message: 'The order is empty'
        });
  
      let total = 0;
      let stockChange: any = [];
  
      const orderDetail = getCart.map((cart) => {
        const productId = cart.productId;
        const quantity = cart.quantity;
        const newStock = cart.product.stock - quantity;
  
        const price = cart.product.price;
        const totalPerProduct = Number(price) * Number(quantity);
        total += totalPerProduct;
  
        stockChange.push( this.prisma.product.update({
            where: { id: productId },
            data: {
              stock: Number(newStock)
            }
          }));
        return { productId, quantity };
      });
  
      const createOrder = this.prisma.order.create({
        data: {
          clientId,
          total,
          orderDetail: { create: orderDetail }
        }
      });
  
      const transaction = await this.prisma.$transaction([ createOrder, ...stockChange ]);
  
      if (!transaction) {
        return res.status(404).send({
          message: "sorry, there's a problem with the transaction"
        });
      } else {
        return res.status(200).send({
          message: 'purchase successfully'
        });
      }
  
    } catch (err) {
      return res.status(500).send({
        message: 'ups, server error',
        err
      });
    }
    
  };

  getOrder = async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      if (!orderId)
        return res.status(404).send({
          message: 'Missing param order id'
        });
      const order = await this.prisma.order.findFirst({
        where: { id: Number(orderId) },
        include: { orderDetail: { include: { product: true } } }
      });
      return res.status(200).send({
        order
      });
    } catch (err) {
      return res.status(500).send({
        message: 'ups, server error',
        err
      });
    }
  };

  getOrders = async (req: Request, res: Response) => {
    try {
      const orders = await this.prisma.order.findMany({
        include: { orderDetail: { include: { product: true } } }
      });
      if (!orders) 
      return res.status(404).send({
        message: 'no orders in the database'
      });
      return res.status(200).send({
        orders
      });
    } catch (err) {
      return res.status(500).send({
        mesagge: "ups, server error",
        err
      })
    }
  };
}

const orderController = new OrderController();
export default orderController