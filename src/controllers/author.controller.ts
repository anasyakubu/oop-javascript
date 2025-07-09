import { Request, Response } from 'express';
import User from '../models/Author';

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (_: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  await user.update(req.body);
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  await user.destroy();
  res.json({ message: 'User deleted' });
};
