import { Router } from 'express';
import { login, register, logout } from '../controllers/auth.controller';

const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.post('/register', register);
authRoutes.post('/logout', logout);

export default authRoutes;