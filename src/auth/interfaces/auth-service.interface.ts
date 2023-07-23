import { User } from "../../user/entities/users.entity";

export interface IAuthService {
  validateUser(email: string, password: string): Promise<User | null>;
}
