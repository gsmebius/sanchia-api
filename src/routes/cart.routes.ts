import express from 'express';
import { verifyToken } from '../utilities/middlewere';
import { addToCart, 
    removeToCart, 
    getCart} from '../controllers/cart.controller';

export const cartRouter = express.Router();

cartRouter.get('/', verifyToken, getCart);
cartRouter.post('/:productId', verifyToken, addToCart);
cartRouter.delete('/:productId', verifyToken, removeToCart);