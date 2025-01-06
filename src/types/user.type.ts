import { Role } from "./role.type";

export type User = {
  clientId: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  uid: string;
  roles: Role[];
  authStatus: "active" | "pending" | "locked";
  imageUrl?: string;
  lastActive?: string;
  status?: string;
};

export type CompleteUserRequestPackage = {
  uid: string;
  password: string;
};

export type UserDirectory = {
  [key: string]: User[];
};
