import { Request, Response } from 'express';
import { compare, hash } from 'bcryptjs';
import UserModel from '../models/User';
import { generateToken } from '../utils/jwt';

async function signup(req: any, res: any): Promise<void> {
  const { username, email, password } = req.body;

  try {
    if(!username && !email && !password){
        return res.status(404).json({ error: 'Enter valid username email password' });
    }
    const alreadyExists = await UserModel.findOne({ email });
    if (!alreadyExists) {
      return res.status(404).json({ error: 'User not found' });
    }
    const hashedPassword = await hash(password, 10);
    const user = await UserModel.create({ username, email, password: hashedPassword });

    const token = generateToken({ userId: user._id.toString(), email: user.email });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function login(req: any, res: any): Promise<void> {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = generateToken({ userId: user._id.toString(), email: user.email });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { signup, login };
