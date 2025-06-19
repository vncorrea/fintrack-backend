import { prisma } from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password)))
    throw new Error("Credenciais inválidas");

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
  return { token, user: { id: user.id, name: user.name } };
}

export async function register({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const userExists = await prisma.user.findUnique({ where: { email } });
  
  if (userExists) throw new Error("Usuário já existe");

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { name, email, password: hash } });
  return { id: user.id, name: user.name, email: user.email };
}

export async function logout(id: string) {
  return { success: true };
}