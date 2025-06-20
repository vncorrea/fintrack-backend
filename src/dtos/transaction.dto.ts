// DTOs para Transaction
export interface CreateTransactionDto {
  description: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  categoryId: string;
  date: string; // ISO string
}

export interface UpdateTransactionDto {
  description?: string;
  amount?: number;
  type?: 'INCOME' | 'EXPENSE';
  categoryId?: string;
  date?: string; // ISO string
}

export interface TransactionResponseDto {
  id: string;
  description: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  category: {
    id: string;
    name: string;
    description?: string;
  };
  date: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionListResponseDto {
  transactions: TransactionResponseDto[];
  total: number;
  page: number;
  limit: number;
} 