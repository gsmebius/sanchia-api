import { Router } from "express";
import { verifyToken, forUsers } from "../utilities/middlewares";
import promotionController from "../controllers/promotion.controller";

class PromotionRouter {
    public router: Router = Router();

    constructor() {
        this.createPromotion();
        this.getPromotions();
        this.getPromotionById();
        this.updatePromotion();
        this.deletePromotion();
    }

    public createPromotion = () => {
        this.router.post('/', verifyToken, forUsers, promotionController.createPromotion);
    };
    
    public getPromotions = () => {
        this.router.get('/', verifyToken, forUsers, promotionController.getPromotions);
    };

    public getPromotionById = () => {
        this.router.get('/:promoId', verifyToken, forUsers, promotionController.getPromotionById);
    };

    public updatePromotion = () => {
        this.router.put('/:promoId', verifyToken, forUsers, promotionController.updatePromotion);
    };

    public deletePromotion = () => {
        this.router.delete('/:promoId', verifyToken, forUsers, promotionController.deletePromotion);
    };
}

const promotionRouter = new PromotionRouter();
export default promotionRouter.router;