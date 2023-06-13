import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomRequest } from './models';
import multer from 'multer';

const prisma = new PrismaClient();
dotenv.config();

//Access token
export const verifyToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    const removeBearer = authorization?.split(' ') || '';
    const token = removeBearer[1];
    const verify: any = jwt.verify(String(token), String(process.env.JWT_KEY));

    const tokenUserExist = await prisma.user.findFirst({
      where: { accessToken: token }
    });
    const tokenClientExist = await prisma.client.findFirst({
      where: { accessToken: token }
    });

    let foundToken = false;
    if (tokenClientExist || tokenUserExist) {
      foundToken = true;
    }

    if (String(verify) && foundToken) {
      const data: any = jwt.decode(token);
      req.user = data;
      next();
    } else {
      return res.status(400).send({
        message: 'You have to signin or signup first'
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      err
    });
  }
};

export const forUsers = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.user?.id);

    const user = await prisma.user.findFirst({
      where: { id: Number(userId) }
    });
    if(user) {
      next();
    } res.status(404).send({
      messagge: 'invalid user access'
    })
  } catch (err) {
    return res.status(500).send({
      message: "ups, server error",
      err
    });
  }
};

export const forClients = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const clientId = Number(req.user?.id);

    const client = await prisma.client.findFirst({
      where: { id: Number(clientId) }
    });
    if(client) {
      next();
    } res.status(404).send({
      messagge: 'invalid user access'
    })
  } catch (err) {
    return res.status(500).send({
      message: "ups, server error",
      err
    });
  }
};

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = file.originalname.split('.').pop();
    const filename = `${uniqueSuffix}.${extension}`;
    cb(null, filename);
  }
});

export const upload = multer({ storage });
