import { Router } from 'express';
import cartController from '../controllers/cart.controller';
import { verifyToken, forClients } from '../utilities/middlewares';

class CartRouter {
    public router : Router = Router();

    constructor() {
        this.getCart();
        this.addToCart();
        this.removeToCart();
    }

    public getCart = () => {
        this.router.get('/', verifyToken, forClients, cartController.getCart);
    };

    public addToCart = () => {
        this.router.post('/:productId', verifyToken, forClients, cartController.addToCart);
    };

    public removeToCart = () => {
        this.router.delete('/:productId', verifyToken, forClients, cartController.removeToCart);
    };
}

const cartRouter = new CartRouter();
export default cartRouter.router;