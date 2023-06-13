import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomRequest } from '../utilities/models';

class PreOrderController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  createPreOrder = async (req: CustomRequest, res: Response) => {
    try {
      const clientId = Number(req.params);
      const userId = Number(req.user?.id);
      const products = req.body;

      if (!clientId)
        return res.status(400).send({ message: 'Missing param clientId' });
      if (!userId)
        return res.status(400).send({ message: 'Missing param userId' });
      if (!products)
        return res.status(400).send({ message: 'Missing products' });

      const createPreOrder = await this.prisma.preOrder.create({
        data: { clientId, userId, products }
      });

      return res
        .status(200)
        .send({ message: 'product added successfully', createPreOrder });
    } catch (err) {
      return res.status(500).send({ message: 'ups, server error', err });
    }
  };

  getPreOrderByClientId = async (req: Request, res: Response) => {
    try {
      const { clientId } = req.params;
      const preOrder = await this.prisma.preOrder.findFirst({
        where: { clientId: Number(clientId) }
      });
      return res.status(200).send({ preOrder });
    } catch (err) {
      return res.status(500).send({ message: 'ups, server error', err });
    }
  };

  getPreOrders = async (req: CustomRequest, res: Response) => {
    try {
      const userId = Number(req.user?.id);
      const preOrders = await this.prisma.preOrder.findMany({
        where: { userId: Number(userId) }
      });
      return res.status(200).send({ preOrders });
    } catch (err) {
      return res.status(500).send({ message: 'ups, server error', err });
    }
  };

  updatePreOrder = async (req: Request, res: Response) => {
    try {
      const clientId = Number(req.params);
      const products = req.body;
      const preOrderUpdate = await this.prisma.preOrder.update({
        where: { clientId },
        data: { products }
      });
      return res
        .status(200)
        .send({ message: 'product updated successfully', preOrderUpdate });
    } catch (err) {
      return res.status(500).send({ message: 'ups, server error', err });
    }
  };

  deletePreOrder = async (req: Request, res: Response) => {
    try {
      const clientId = Number(req.params);
      await this.prisma.preOrder.delete({
        where: { clientId }
      });
      return res.status(200).send({ message: 'category deleted successfully' });
    } catch (err) {
      return res.status(500).send({ message: 'ups, server error', err });
    }
  };
}

const preOrderController = new PreOrderController();
export default preOrderController;
