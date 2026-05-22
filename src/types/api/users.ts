import type { AuthUser, UserRole } from "./auth";
import type { PaginationMeta } from "./common";

export type AdminCreateUserInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  role: UserRole;
  profile_pic_url?: string | null;
};

export type AdminCreateUserResponseData = {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
  };
};

export type UsersListParams = {
  page?: number;
  limit?: number;
};

export type UsersListItem = Pick<
  AuthUser,
  "id" | "email" | "firstName" | "lastName" | "role"
>;

export type UsersListResponseData = {
  users: UsersListItem[];
  meta: PaginationMeta;
};

export type AdminUpdateUserInput = Partial<{
  firstName: string;
  lastName: string;
  country: string;
}>;
