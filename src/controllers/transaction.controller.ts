import { Request, Response } from "express";
import * as TransactionService from "../services/transaction.service";
import { CreateTransactionDto, UpdateTransactionDto, TransactionResponseDto, TransactionListResponseDto } from "../dtos/transaction.dto";

export async function createTransaction(
  req: Request<{}, {}, CreateTransactionDto>, 
  res: Response<TransactionResponseDto | { message: string }>
) {
  try {
    const userId = (req as any).user.id;
    const result: TransactionResponseDto = await TransactionService.createTransaction(userId, req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function getTransactionById(
  req: Request<{ id: string }>, 
  res: Response<TransactionResponseDto | { message: string }>
) {
  try {
    const userId = (req as any).user.id;
    const result: TransactionResponseDto = await TransactionService.getTransactionById(userId, req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
}

export async function getUserTransactions(
  req: Request, 
  res: Response<TransactionListResponseDto | { message: string }>
) {
  try {
    const userId = (req as any).user.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const type = req.query.type as 'INCOME' | 'EXPENSE' | undefined;
    const categoryId = req.query.categoryId as string | undefined;
    const startDate = req.query.startDate as string | undefined;
    const endDate = req.query.endDate as string | undefined;

    const result: TransactionListResponseDto = await TransactionService.getUserTransactions(
      userId, 
      page, 
      limit, 
      type, 
      categoryId, 
      startDate, 
      endDate
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function updateTransaction(
  req: Request<{ id: string }, {}, UpdateTransactionDto>, 
  res: Response<TransactionResponseDto | { message: string }>
) {
  try {
    const userId = (req as any).user.id;
    const result: TransactionResponseDto = await TransactionService.updateTransaction(userId, req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function deleteTransaction(
  req: Request<{ id: string }>, 
  res: Response<{ message: string }>
) {
  try {
    const userId = (req as any).user.id;
    await TransactionService.deleteTransaction(userId, req.params.id);
    res.status(200).json({ message: "Transação deletada com sucesso" });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}
