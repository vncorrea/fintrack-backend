import { Router } from 'express';
import { login, register, logout } from '../controllers/auth.controller';
import { validateLogin, validateRegister, validateEmailFormat } from '../middlewares/validation.middleware';

const authRoutes = Router();

authRoutes.post('/login', validateLogin, validateEmailFormat, login);
authRoutes.post('/register', validateRegister, validateEmailFormat, register);
authRoutes.post('/logout', logout);

export default authRoutes;