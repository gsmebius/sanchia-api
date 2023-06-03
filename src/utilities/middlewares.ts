import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
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

    let foundToken = false
    if (tokenClientExist || tokenUserExist) {
      foundToken = true
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
      error: err
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
  },
});

export const upload = multer({ storage });


