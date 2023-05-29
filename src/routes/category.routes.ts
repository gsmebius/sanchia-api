import express from 'express';
import { verifyToken } from '../utilities/middlewere';
import { getCategories, 
    getCategoryById, 
    createCategory, 
    updateCategory, 
    deleteCategory} from '../controllers/category.controller';

export const categoryRouter = express.Router();

categoryRouter.get('/', getCategories);
categoryRouter.get('/:categoryId', getCategoryById);
categoryRouter.post('/', verifyToken, createCategory);
categoryRouter.put('/:categoryId', verifyToken, updateCategory);
categoryRouter.delete('/:categoryId', verifyToken, deleteCategory);
