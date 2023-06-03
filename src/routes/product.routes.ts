import express from 'express';
import { verifyToken, upload } from '../utilities/middlewares';
import { getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct} from '../controllers/product.controller';

export const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.get('/:productId', getProductById);
productRouter.post('/', verifyToken, upload.array('images', 5), createProduct);
productRouter.put('/:productId', verifyToken, updateProduct);
productRouter.delete('/:productId', verifyToken, deleteProduct);