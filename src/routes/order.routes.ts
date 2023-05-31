import express from 'express';
import { verifyToken } from '../utilities/middlewere';
import { getOrder, 
    createOrder} from '../controllers/order.controller';

export const orderRouter = express.Router();

orderRouter.get('/:orderId', verifyToken, getOrder);
orderRouter.post('/', verifyToken, createOrder);