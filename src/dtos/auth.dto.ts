// DTOs para validação de entrada (request)
export interface LoginDto {
    email: string;
    password: string;
  }
  
  export interface RegisterDto {
    name: string;
    email: string;
    password: string;
  }

// DTOs para resposta (response)
export interface LoginResponseDto {
    token: string;
    user: {
      id: string;
      name: string;
    };
  }
  
  export interface RegisterResponseDto {
    id: string;
    name: string;
    email: string;
  }