import { Request, Response } from "express";
import * as CategoryService from "../services/category.service";
import { CreateCategoryDto, UpdateCategoryDto, CategoryResponseDto, CategoryListResponseDto } from "../dtos/category.dto";

export async function createCategory(
  req: Request<{}, {}, CreateCategoryDto>, 
  res: Response<CategoryResponseDto | { message: string }>
) {
  try {
    const result: CategoryResponseDto = await CategoryService.createCategory(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function getCategoryById(
  req: Request<{ id: string }>, 
  res: Response<CategoryResponseDto | { message: string }>
) {
  try {
    const result: CategoryResponseDto = await CategoryService.getCategoryById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
}

export async function getAllCategories(
  req: Request, 
  res: Response<CategoryListResponseDto | { message: string }>
) {
  try {
    const result: CategoryListResponseDto = await CategoryService.getAllCategories();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function updateCategory(
  req: Request<{ id: string }, {}, UpdateCategoryDto>, 
  res: Response<CategoryResponseDto | { message: string }>
) {
  try {
    const result: CategoryResponseDto = await CategoryService.updateCategory(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function deleteCategory(
  req: Request<{ id: string }>, 
  res: Response<{ message: string }>
) {
  try {
    await CategoryService.deleteCategory(req.params.id);
    res.status(200).json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
} 