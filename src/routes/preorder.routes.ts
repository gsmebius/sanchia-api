import { Router } from 'express';
import preOrderController from '../controllers/preorder.controller';
import { verifyToken, forUsers } from '../utilities/middlewares';

class PreOrderRouter {
    public router : Router = Router();

    constructor() {
        this.getPreOrderByClientId();
        this.getPreOrders();
        this.createPreOrder();
        this.updatePreOrder();
        this.deletePreOrder();
    }

    public getPreOrderByClientId = () => {
        this.router.get('/:clientId', verifyToken, forUsers, preOrderController.getPreOrderByClientId);
    };

    public getPreOrders = () => {
        this.router.get('/', verifyToken, forUsers, preOrderController.getPreOrders);
    };

    public createPreOrder = () => {
        this.router.post('/', verifyToken, forUsers, preOrderController.createPreOrder);
    };

    public updatePreOrder = () => {
        this.router.put('/:clientId', verifyToken, forUsers, preOrderController.updatePreOrder);
    };

    public deletePreOrder = () => {
        this.router.put('/:clientId', verifyToken, forUsers, preOrderController.deletePreOrder);
    };
}

const preOrderRouter = new PreOrderRouter();
export default preOrderRouter.router; 