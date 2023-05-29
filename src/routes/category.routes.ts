import express from 'express';
import { getCategories, 
    getCategoryById, 
    createCategory, 
    updateCategory, 
    deleteCategory} from '../controllers/category.controller';

export const categoryRouter = express.Router();

categoryRouter.get('/', getCategories);
categoryRouter.get('/:categoryId', getCategoryById);
categoryRouter.post('/', createCategory);
categoryRouter.put('/:categoryId', updateCategory);
categoryRouter.delete('/:categoryId', deleteCategory);
