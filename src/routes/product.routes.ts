import express from 'express';
import { getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct} from '../controllers/product.controller';

export const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.get('/:productId', getProductById);
productRouter.post('/', createProduct);
productRouter.put('/:productId', updateProduct);
productRouter.delete('/:productId', deleteProduct);