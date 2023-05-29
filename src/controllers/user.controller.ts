import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { compare, encrypt, tokenKey } from './../utilities/helpers';

const prisma = new PrismaClient();
export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const passwordHash = await encrypt(password);
    const registerUser = await prisma.user.create({
      data: { name, email, password: passwordHash, role }
    });
    const tokenSession = await tokenKey(registerUser.id);
    const userToken = await prisma.user.update({
      where: { id: registerUser.id },
      data: { accessToken : tokenSession }
    });
    return res.status(200).send({
      userToken
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  let { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: { email }
    });
    if (!user) {
      res.status(404).json({
        message: 'user not found'
      });
    }
    const checkpass = await compare(password, String(user?.password));
    const tokenSession = await tokenKey(user?.id);
    const userUpdate = await prisma.user.update({
      where: { id: user?.id },
      data: { accessToken: tokenSession }
    });
    if (!checkpass) {
      res.status(404).json({
        message: 'incorrect password'
      });
    }
    if (checkpass) {
      return res.status(200).send({
        userUpdate
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};

export const signOut = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId)
      return res.status(400).send({
        message: 'Missing param: id'
      });
    await prisma.user.update({
      where: { id: Number(userId) },
      data: { accessToken: '' }
    });
    return res.status(200).send({
      message: 'AccessToken was destroyed'
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).send({
      users
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { name, email, password, role } = req.body;
    const passwordHash = await encrypt(password);
    const userUpdate = await prisma.user.update({
      where: { id: Number(userId) },
      data: { name, email, password : passwordHash, role }
    });
    return res.status(200).send({
      message: 'product updated successfully',
      userUpdate
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await prisma.user.delete({
      where: { id: Number(userId) }
    });
    return res.status(200).send({
      message: 'product deleted successfully'
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};
