import express from 'express';
import { verifyToken } from '../utilities/middlewere';
import { getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct} from '../controllers/product.controller';

export const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.get('/:productId', getProductById);
productRouter.post('/', verifyToken, createProduct);
productRouter.put('/:productId', verifyToken, updateProduct);
productRouter.delete('/:productId', verifyToken, deleteProduct);