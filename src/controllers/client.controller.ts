import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { compare, encrypt, tokenKey } from '../utilities/helpers';

const prisma = new PrismaClient();

export const clientSignUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const passwordHash = await encrypt(password);
    const registerClient = await prisma.client.create({
      data: { name, email, password: passwordHash, role }
    });
    const tokenSession = await tokenKey(registerClient.id);
    const clientWithToken = await prisma.client.update({
      where: { id: registerClient.id },
      data: { accessToken : tokenSession }
    });
    return res.status(200).send({
      clientWithToken
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};

export const clientSignIn = async (req: Request, res: Response) => {
  let { email, password } = req.body;
  try {
    const client = await prisma.client.findFirst({
      where: { email }
    });
    if (!client) {
      res.status(404).json({
        message: 'user not found'
      });
    }
    const checkpass = await compare(password, String(client?.password));
    const tokenSession = await tokenKey(client?.id);
    const clientUpdate = await prisma.client.update({
      where: { id: client?.id },
      data: { accessToken: tokenSession }
    });
    if (!checkpass) {
      res.status(404).json({
        message: 'incorrect password'
      });
    }
    if (checkpass) {
      return res.status(200).send({
        clientUpdate
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};

export const clientSignOut = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    if (!clientId)
      return res.status(400).send({
        message: 'Missing param: id'
      });
    await prisma.client.update({
      where: { id: Number(clientId) },
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

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await prisma.client.findMany();
    return res.status(200).send({
      clients
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    const { name, email, password, role } = req.body;
    const passwordHash = await encrypt(password);
    const clientUpdate = await prisma.user.update({
      where: { id: Number(clientId) },
      data: { name, email, password : passwordHash, role }
    });
    return res.status(200).send({
      message: 'client updated successfully',
      clientUpdate
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    await prisma.client.delete({
      where: { id: Number(clientId) }
    });
    return res.status(200).send({
      message: 'client deleted successfully'
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};
