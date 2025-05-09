import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await AuthService.login({ email, password });

  res.status(200).json(user);
}

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const user = await AuthService.register({ name, email, password });

  res.status(201).json(user);
}
