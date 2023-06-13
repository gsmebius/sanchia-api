import { Router } from 'express';
import orderController from '../controllers/order.controller';
import { verifyToken, forUsers, forClients } from '../utilities/middlewares';

class OrderRouter {
    public router : Router = Router();

    constructor() {
        this.createOrder();
        this.getOrder();
        this.getOrders();
    }

    public getOrder = () => {
        this.router.get('/:orderId', verifyToken, orderController.getOrder);
    };

    public getOrders = () => {
        this.router.get('/', verifyToken, forUsers, orderController.getOrders);
    };

    public createOrder = () => {
        this.router.post('/', verifyToken, forClients, orderController.createOrder);
    };
}

const orderRouter = new OrderRouter();
export default orderRouter.router;