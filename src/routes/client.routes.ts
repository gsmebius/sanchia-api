import express from 'express';
import { verifyToken } from '../utilities/middlewares';
import { clientSignIn, 
    clientSignUp, 
    clientSignOut, 
    getClients, 
    deleteClient, 
    updateClient } from '../controllers/client.controller';

export const clientRouter = express.Router();

clientRouter.post('/', clientSignUp);
clientRouter.post('/signin', clientSignIn);
clientRouter.post('/out/:clientId', clientSignOut);
clientRouter.get('/', verifyToken, getClients);
clientRouter.delete('/:clientId', verifyToken, deleteClient);
clientRouter.put('/:clientId', verifyToken, updateClient);