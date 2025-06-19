import { PrismaClient } from "../generated/prisma";
import { CreateTransactionDto, UpdateTransactionDto, TransactionResponseDto, TransactionListResponseDto } from "../dtos/transaction.dto";

const prisma = new PrismaClient();

export async function createTransaction(userId: string, data: CreateTransactionDto): Promise<TransactionResponseDto> {
  // Verificar se a categoria existe
  const category = await prisma.category.findUnique({
    where: { id: data.categoryId }
  });

  if (!category) {
    throw new Error("Categoria não encontrada");
  }

  const transaction = await prisma.transaction.create({
    data: {
      description: data.description,
      amount: data.amount,
      type: data.type,
      categoryId: data.categoryId,
      date: new Date(data.date),
      userId: userId
    },
    include: {
      category: true
    }
  });

  return {
    id: transaction.id,
    description: transaction.description,
    amount: Number(transaction.amount),
    type: transaction.type,
    category: {
      id: transaction.category.id,
      name: transaction.category.name,
      description: transaction.category.description || undefined
    },
    date: transaction.date.toISOString(),
    userId: transaction.userId,
    createdAt: transaction.createdAt.toISOString(),
    updatedAt: transaction.updatedAt.toISOString()
  };
}

export async function getTransactionById(userId: string, transactionId: string): Promise<TransactionResponseDto> {
  const transaction = await prisma.transaction.findFirst({
    where: {
      id: transactionId,
      userId: userId
    },
    include: {
      category: true
    }
  });

  if (!transaction) {
    throw new Error("Transação não encontrada");
  }

  return {
    id: transaction.id,
    description: transaction.description,
    amount: Number(transaction.amount),
    type: transaction.type,
    category: {
      id: transaction.category.id,
      name: transaction.category.name,
      description: transaction.category.description || undefined
    },
    date: transaction.date.toISOString(),
    userId: transaction.userId,
    createdAt: transaction.createdAt.toISOString(),
    updatedAt: transaction.updatedAt.toISOString()
  };
}

export async function getUserTransactions(
  userId: string, 
  page: number = 1, 
  limit: number = 10,
  type?: 'INCOME' | 'EXPENSE',
  categoryId?: string,
  startDate?: string,
  endDate?: string
): Promise<TransactionListResponseDto> {
  const skip = (page - 1) * limit;
  
  const where: any = {
    userId: userId
  };

  if (type) {
    where.type = type;
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (startDate || endDate) {
    where.date = {};
    if (startDate) {
      where.date.gte = new Date(startDate);
    }
    if (endDate) {
      where.date.lte = new Date(endDate);
    }
  }

  const [transactions, total] = await Promise.all([
    prisma.transaction.findMany({
      where,
      include: {
        category: true
      },
      orderBy: {
        date: 'desc'
      },
      skip,
      take: limit
    }),
    prisma.transaction.count({ where })
  ]);

  return {
    transactions: transactions.map(transaction => ({
      id: transaction.id,
      description: transaction.description,
      amount: Number(transaction.amount),
      type: transaction.type,
      category: {
        id: transaction.category.id,
        name: transaction.category.name,
        description: transaction.category.description || undefined
      },
      date: transaction.date.toISOString(),
      userId: transaction.userId,
      createdAt: transaction.createdAt.toISOString(),
      updatedAt: transaction.updatedAt.toISOString()
    })),
    total,
    page,
    limit
  };
}

export async function updateTransaction(
  userId: string, 
  transactionId: string, 
  data: UpdateTransactionDto
): Promise<TransactionResponseDto> {
  // Verificar se a transação existe e pertence ao usuário
  const existingTransaction = await prisma.transaction.findFirst({
    where: {
      id: transactionId,
      userId: userId
    }
  });

  if (!existingTransaction) {
    throw new Error("Transação não encontrada");
  }

  // Se categoryId foi fornecido, verificar se a categoria existe
  if (data.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId }
    });

    if (!category) {
      throw new Error("Categoria não encontrada");
    }
  }

  const updateData: any = {};
  if (data.description !== undefined) updateData.description = data.description;
  if (data.amount !== undefined) updateData.amount = data.amount;
  if (data.type !== undefined) updateData.type = data.type;
  if (data.categoryId !== undefined) updateData.categoryId = data.categoryId;
  if (data.date !== undefined) updateData.date = new Date(data.date);

  const transaction = await prisma.transaction.update({
    where: { id: transactionId },
    data: updateData,
    include: {
      category: true
    }
  });

  return {
    id: transaction.id,
    description: transaction.description,
    amount: Number(transaction.amount),
    type: transaction.type,
    category: {
      id: transaction.category.id,
      name: transaction.category.name,
      description: transaction.category.description || undefined
    },
    date: transaction.date.toISOString(),
    userId: transaction.userId,
    createdAt: transaction.createdAt.toISOString(),
    updatedAt: transaction.updatedAt.toISOString()
  };
}

export async function deleteTransaction(userId: string, transactionId: string): Promise<void> {
  const transaction = await prisma.transaction.findFirst({
    where: {
      id: transactionId,
      userId: userId
    }
  });

  if (!transaction) {
    throw new Error("Transação não encontrada");
  }

  await prisma.transaction.delete({
    where: { id: transactionId }
  });
} 