import { Router } from 'express';
import orderController from '../controllers/order.controller';
import { verifyToken } from '../utilities/middlewares';

class OrderRouter {
    public router : Router = Router();

    constructor() {
        this.createOrder();
        this.getOrder();
        this.getOrders();
    }

    public getOrder = () => {
        this.router.post('/:orderId', verifyToken, orderController.getOrder);
    };

    public getOrders = () => {
        this.router.post('/', verifyToken, orderController.getOrders);
    };

    public createOrder = () => {
        this.router.post('/', verifyToken, orderController.createOrder);
    };
}

const orderRouter = new OrderRouter();
export default orderRouter.router;