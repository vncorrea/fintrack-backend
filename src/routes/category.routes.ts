import { Router } from "express";
import * as CategoryController from "../controllers/category.controller";
import { validateCreateCategory } from "../middlewares/validation.middleware";

const router = Router();

// Criar nova categoria
router.post("/", validateCreateCategory, CategoryController.createCategory);

// Buscar categoria por ID
router.get("/:id", CategoryController.getCategoryById);

// Listar todas as categorias
router.get("/", CategoryController.getAllCategories);

// Atualizar categoria
router.put("/:id", CategoryController.updateCategory);

// Deletar categoria
router.delete("/:id", CategoryController.deleteCategory);

export default router; 