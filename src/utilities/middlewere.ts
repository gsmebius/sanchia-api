import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomRequest } from './models';
const prisma = new PrismaClient();
dotenv.config();
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
    const tokenExist = await prisma.user.findFirst({
      where: { accessToken: token }
    });
    if (String(verify) && tokenExist) {
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
