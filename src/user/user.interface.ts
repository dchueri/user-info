export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  birthDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
