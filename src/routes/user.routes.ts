import express from 'express';
import { verifyToken } from '../utilities/middlewere';
import { signIn, 
    signUp, 
    signOut, 
    getUsers, 
    deleteUser, 
    updateUser } from '../controllers/user.controller';

export const userRouter = express.Router();

userRouter.post('/', signUp);
userRouter.post('/signin', signIn);
userRouter.post('/out/:userId', signOut);
userRouter.get('/', verifyToken, getUsers);
userRouter.delete('/:userId', verifyToken, deleteUser);
userRouter.put('/:userId', verifyToken, updateUser);
