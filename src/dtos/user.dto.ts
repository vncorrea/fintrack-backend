// DTOs para resposta (response)
export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// DTO para atualização de usuário (futuro)
export interface UpdateUserDto {
  name?: string;
  email?: string;
}
