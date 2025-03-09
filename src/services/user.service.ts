import axios, { AxiosError } from "axios";
import { User } from "@prisma/client";

interface CreateUserParams {
  email: string;
  name?: string;
}

interface UpdateUserRoleParams {
  userId: string;
  role: "student" | "company";
}

async function fetchUsers(): Promise<User[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const url = `${baseUrl}/api/user`;

  const response = await axios.get(url);
  return response.data;
}

async function fetchLatestUser(): Promise<User> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const url = `${baseUrl}/api/user`;

  const response = await axios.get(url, {
    params: {
      latest: true
    }
  });
  return response.data;
}

async function fetchUserByEmail(email: string): Promise<User | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const url = `${baseUrl}/api/user`;
    
    const response = await axios.get(url, {
      params: {
        email
      }
    });
    
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

async function createUser(params: CreateUserParams): Promise<User> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const url = `${baseUrl}/api/user`;

  const response = await axios.post(url, params);
  return response.data;
}

async function updateUserRole({ userId, role }: UpdateUserRoleParams): Promise<User> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const url = `${baseUrl}/api/user/${userId}`;

  const response = await axios.patch(url, { role });
  return response.data;
}

const UserService = {
  fetchUsers,
  fetchLatestUser,
  fetchUserByEmail,
  createUser,
  updateUserRole,
};

export default UserService;
