
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  joined: string;
  status: "active" | "banned";
}

export type UserFormData = Omit<User, "id" | "joined" | "status">;

