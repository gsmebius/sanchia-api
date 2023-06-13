import { Router } from 'express';
import userController from '../controllers/user.controller';
import { verifyToken, forUsers } from '../utilities/middlewares';

class UserRouter {
    public router : Router = Router();

    constructor() {
        this.signUp();
        this.signIn();
        this.signOut();
        this.getUsers();
        this.updateUser();
        this.deleteUser();
    } 

    public signUp = () => {
        this.router.post('/', userController.signUp);
    };

    public signIn = () => {
        this.router.post('/singin', userController.signIn);
    };

    public signOut = () => {
        this.router.post('/out/:userId', userController.signOut);
    };

    public getUsers = () => {
        this.router.get('/', verifyToken, forUsers, userController.getUsers);
    };

    public updateUser = () => {
        this.router.delete('/:userId', verifyToken, forUsers, userController.updateUser);
    };

    public deleteUser = () => {
        this.router.post('/:userId', verifyToken, forUsers, userController.deleteUser);
    };
}

const userRouter = new UserRouter();
export default userRouter.router;
