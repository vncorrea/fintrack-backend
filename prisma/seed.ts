import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Categorias padrão para receitas
  const incomeCategories = [
    { name: 'Salário', description: 'Rendimento do trabalho principal' },
    { name: 'Freelance', description: 'Trabalhos extras e projetos' },
    { name: 'Investimentos', description: 'Rendimentos de aplicações financeiras' },
    { name: 'Vendas', description: 'Venda de produtos ou serviços' },
    { name: 'Outros', description: 'Outras fontes de receita' }
  ];

  // Categorias padrão para despesas
  const expenseCategories = [
    { name: 'Alimentação', description: 'Gastos com comida e refeições' },
    { name: 'Transporte', description: 'Combustível, transporte público, etc.' },
    { name: 'Moradia', description: 'Aluguel, contas de casa, etc.' },
    { name: 'Saúde', description: 'Consultas médicas, medicamentos, etc.' },
    { name: 'Educação', description: 'Cursos, livros, material escolar' },
    { name: 'Lazer', description: 'Entretenimento e diversão' },
    { name: 'Vestuário', description: 'Roupas, calçados, acessórios' },
    { name: 'Tecnologia', description: 'Eletrônicos, software, etc.' },
    { name: 'Serviços', description: 'Assinaturas, serviços diversos' },
    { name: 'Outros', description: 'Outras despesas' }
  ];

  // Criar categorias de receita
  for (const category of incomeCategories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: {
        name: category.name,
        description: category.description
      }
    });
    console.log(`✅ Categoria criada: ${category.name}`);
  }

  // Criar categorias de despesa
  for (const category of expenseCategories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: {
        name: category.name,
        description: category.description
      }
    });
    console.log(`✅ Categoria criada: ${category.name}`);
  }

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 