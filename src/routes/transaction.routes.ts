import { Router } from "express";
import * as TransactionController from "../controllers/transaction.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { 
  validateCreateTransaction, 
  validateTransactionType, 
  validateTransactionAmount, 
  validateDateFormat 
} from "../middlewares/validation.middleware";

const router = Router();

// Todas as rotas de transação requerem autenticação
router.use(authenticateToken);

// Criar nova transação
router.post(
  "/", 
  validateCreateTransaction,
  validateTransactionType,
  validateTransactionAmount,
  validateDateFormat,
  TransactionController.createTransaction
);

// Buscar transação por ID
router.get("/:id", TransactionController.getTransactionById);

// Listar transações do usuário (com filtros opcionais)
router.get("/", TransactionController.getUserTransactions);

// Atualizar transação
router.put(
  "/:id",
  validateTransactionType,
  validateTransactionAmount,
  validateDateFormat,
  TransactionController.updateTransaction
);

// Deletar transação
router.delete("/:id", TransactionController.deleteTransaction);

export default router; 