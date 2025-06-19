import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Todos os campos são obrigatórios" });
    return;
  }

  try {
    const user = await AuthService.login({ email, password });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
    return;
  }
}

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Todos os campos são obrigatórios" });
    return;
  }

  try {
    const user = await AuthService.register({ name, email, password });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
    return;
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const { id } = req.body;
    await AuthService.logout(id);
    res.status(200).json({ message: "Logout realizado com sucesso" });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
    return;
  }
}
