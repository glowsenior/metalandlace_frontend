
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  joined: string;
  status: "active" | "banned";
}

export type UserFormData = Omit<User, "id" | "joined" | "status">;

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
  name?: string; // Optional for backward compatibility
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

