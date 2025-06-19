import { Request, Response, NextFunction } from "express";

// Função utilitária para validar se todos os campos obrigatórios estão presentes
export function validateRequiredFields(requiredFields: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      res.status(400).json({
        message: `Campos obrigatórios ausentes: ${missingFields.join(", ")}`
      });
      return;
    }
    
    next();
  };
}

// Middleware específico para validação de login
export const validateLogin = validateRequiredFields(["email", "password"]);

// Middleware específico para validação de registro
export const validateRegister = validateRequiredFields(["name", "email", "password"]);

// Middleware específico para validação de criação de transação
export const validateCreateTransaction = validateRequiredFields(["description", "amount", "type", "categoryId", "date"]);

// Middleware específico para validação de criação de categoria
export const validateCreateCategory = validateRequiredFields(["name"]);

// Função para validar formato de email
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Middleware para validar formato de email
export function validateEmailFormat(req: Request, res: Response, next: NextFunction): void {
  const { email } = req.body;
  
  if (email && !validateEmail(email)) {
    res.status(400).json({
      message: "Formato de email inválido"
    });
    return;
  }
  
  next();
}

// Middleware para validar tipo de transação
export function validateTransactionType(req: Request, res: Response, next: NextFunction): void {
  const { type } = req.body;
  
  if (type && !['INCOME', 'EXPENSE'].includes(type)) {
    res.status(400).json({
      message: "Tipo de transação deve ser 'INCOME' ou 'EXPENSE'"
    });
    return;
  }
  
  next();
}

// Middleware para validar valor da transação
export function validateTransactionAmount(req: Request, res: Response, next: NextFunction): void {
  const { amount } = req.body;
  
  if (amount !== undefined) {
    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      res.status(400).json({
        message: "Valor da transação deve ser um número positivo"
      });
      return;
    }
  }
  
  next();
}

// Middleware para validar formato de data
export function validateDateFormat(req: Request, res: Response, next: NextFunction): void {
  const { date } = req.body;
  
  if (date) {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      res.status(400).json({
        message: "Formato de data inválido. Use ISO string (YYYY-MM-DDTHH:mm:ss.sssZ)"
      });
      return;
    }
  }
  
  next();
} 