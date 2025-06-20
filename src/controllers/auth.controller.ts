import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";
import { LoginDto, RegisterDto, LoginResponseDto, RegisterResponseDto } from "../dtos/auth.dto";

export async function login(
  req: Request<{}, {}, LoginDto>, 
  res: Response<LoginResponseDto | { message: string }>
) {
  try {
    const result: LoginResponseDto = await AuthService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function register(
  req: Request<{}, {}, RegisterDto>, 
  res: Response<RegisterResponseDto | { message: string }>
) {
  try {
    const result: RegisterResponseDto = await AuthService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function logout(req: Request, res: Response) {
  res.status(200).json({ message: "Logout realizado com sucesso" });
}
