import { RequestHandler } from "express";
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ApiResponse,
  User,
} from "@shared/api";

// Mock data - In production, use a real database
const users: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "user@example.com",
    name: "Regular User",
    role: "user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const handleLogin: RequestHandler = (req, res) => {
  const { email, password } = req.body as LoginRequest;

  // Mock authentication - In production, use proper password hashing
  const user = users.find((u) => u.email === email);

  if (!user || password !== "password123") {
    return res.status(401).json({
      success: false,
      error: "Invalid credentials",
    } as ApiResponse);
  }

  const response: ApiResponse<AuthResponse> = {
    success: true,
    data: {
      user,
      token: `mock-jwt-token-${user.id}`,
    },
  };

  res.json(response);
};

export const handleRegister: RequestHandler = (req, res) => {
  const { email, password, name } = req.body as RegisterRequest;

  // Check if user already exists
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({
      success: false,
      error: "User already exists",
    } as ApiResponse);
  }

  const newUser: User = {
    id: (users.length + 1).toString(),
    email,
    name,
    role: "user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  users.push(newUser);

  const response: ApiResponse<AuthResponse> = {
    success: true,
    data: {
      user: newUser,
      token: `mock-jwt-token-${newUser.id}`,
    },
  };

  res.json(response);
};

export const handleGetProfile: RequestHandler = (req, res) => {
  // Mock getting user from token
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "No token provided",
    } as ApiResponse);
  }

  // Extract user ID from mock token
  const userId = token.replace("mock-jwt-token-", "");
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(401).json({
      success: false,
      error: "Invalid token",
    } as ApiResponse);
  }

  const response: ApiResponse<User> = {
    success: true,
    data: user,
  };

  res.json(response);
};
