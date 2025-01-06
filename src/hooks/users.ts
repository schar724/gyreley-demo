import { User } from "@/types/user.type";
import { sessionStorageUtil } from "./sessionStorageUtil";
import mockUsers from "../mockdb/users.json"; // Import mock data

const USERS_KEY = "users";

// Initialize session storage with mock users data
sessionStorageUtil.initialize(USERS_KEY, mockUsers);

// Helper function to read users from session storage
function _readUsers(): User[] {
  return sessionStorageUtil.read<User[]>(USERS_KEY);
}

// Helper function to write users to session storage
function _writeUsers(users: User[]): void {
  sessionStorageUtil.write(USERS_KEY, users);
}

// Get all users
export const getUsers = (): User[] => {
  return _readUsers();
};

// Add a new user
export const addUser = (newUser: User): User[] => {
  const users = _readUsers();
  users.push(newUser);
  _writeUsers(users);
  return users;
};

// Update an existing user
export const updateUser = (userId: string, updatedUser: User): User[] => {
  const users = _readUsers();
  const index = users.findIndex((user) => user.uid === userId);
  if (index !== -1) {
    users[index] = updatedUser;
    _writeUsers(users);
  }
  return users;
};

// Delete a user
export const deleteUser = (userId: string): User[] => {
  const users = _readUsers();
  const updatedUsers = users.filter((user) => user.uid !== userId);
  _writeUsers(updatedUsers);
  return updatedUsers;
};

// Reset users to initial mock data
export const resetUsers = (): void => {
  sessionStorage.clear();
  sessionStorageUtil.initialize(USERS_KEY, mockUsers);
};

