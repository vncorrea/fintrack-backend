import { PrismaClient } from "../generated/prisma";
import { CreateCategoryDto, UpdateCategoryDto, CategoryResponseDto, CategoryListResponseDto } from "../dtos/category.dto";

const prisma = new PrismaClient();

export async function createCategory(data: CreateCategoryDto): Promise<CategoryResponseDto> {
  // Verificar se já existe uma categoria com o mesmo nome
  const existingCategory = await prisma.category.findUnique({
    where: { name: data.name }
  });

  if (existingCategory) {
    throw new Error("Já existe uma categoria com este nome");
  }

  const category = await prisma.category.create({
    data: {
      name: data.name,
      description: data.description
    }
  });

  return {
    id: category.id,
    name: category.name,
    description: category.description || undefined,
    createdAt: category.createdAt.toISOString(),
    updatedAt: category.updatedAt.toISOString()
  };
}

export async function getCategoryById(categoryId: string): Promise<CategoryResponseDto> {
  const category = await prisma.category.findUnique({
    where: { id: categoryId }
  });

  if (!category) {
    throw new Error("Categoria não encontrada");
  }

  return {
    id: category.id,
    name: category.name,
    description: category.description || undefined,
    createdAt: category.createdAt.toISOString(),
    updatedAt: category.updatedAt.toISOString()
  };
}

export async function getAllCategories(): Promise<CategoryListResponseDto> {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc'
    }
  });

  return {
    categories: categories.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description || undefined,
      createdAt: category.createdAt.toISOString(),
      updatedAt: category.updatedAt.toISOString()
    })),
    total: categories.length
  };
}

export async function updateCategory(
  categoryId: string, 
  data: UpdateCategoryDto
): Promise<CategoryResponseDto> {
  // Verificar se a categoria existe
  const existingCategory = await prisma.category.findUnique({
    where: { id: categoryId }
  });

  if (!existingCategory) {
    throw new Error("Categoria não encontrada");
  }

  // Se o nome foi alterado, verificar se já existe outra categoria com o mesmo nome
  if (data.name && data.name !== existingCategory.name) {
    const categoryWithSameName = await prisma.category.findUnique({
      where: { name: data.name }
    });

    if (categoryWithSameName) {
      throw new Error("Já existe uma categoria com este nome");
    }
  }

  const updateData: any = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.description !== undefined) updateData.description = data.description;

  const category = await prisma.category.update({
    where: { id: categoryId },
    data: updateData
  });

  return {
    id: category.id,
    name: category.name,
    description: category.description || undefined,
    createdAt: category.createdAt.toISOString(),
    updatedAt: category.updatedAt.toISOString()
  };
}

export async function deleteCategory(categoryId: string): Promise<void> {
  // Verificar se a categoria existe
  const category = await prisma.category.findUnique({
    where: { id: categoryId }
  });

  if (!category) {
    throw new Error("Categoria não encontrada");
  }

  // Verificar se existem transações usando esta categoria
  const transactionsCount = await prisma.transaction.count({
    where: { categoryId: categoryId }
  });

  if (transactionsCount > 0) {
    throw new Error("Não é possível deletar uma categoria que possui transações associadas");
  }

  await prisma.category.delete({
    where: { id: categoryId }
  });
} 