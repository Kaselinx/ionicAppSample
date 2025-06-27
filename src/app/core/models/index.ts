// 📋 Core Models - Central location for all data interfaces and types
// This file exports all models used throughout the application

// 👤 User-related models - Keep compatible with existing auth service
export interface User {
  id: string;
  username: string;
  email?: string;
}

// 👤 Extended user model for future use
export interface ExtendedUser extends User {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role?: UserRole;
  createdAt?: string;
  lastLoginAt?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator'
}

// 🔍 Search-related models
export interface SearchResult {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  summary: string;
  tags?: string[];
  url?: string;
}

export interface SearchFilters {
  category?: string;
  author?: string;
  dateFrom?: string;
  dateTo?: string;
  tags?: string[];
}

// 🌐 API-related models
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  timestamp: string;
}

// 🌐 Backend message - Keep compatible with existing api service
export interface BackendMessage {
  message: string;
  timestamp: string;
  status: string;  // Keep as string to match existing service
}

// 🌐 Typed backend message for future use
export interface TypedBackendMessage {
  message: string;
  timestamp: string;
  status: 'success' | 'error' | 'info';
}

// 📱 UI-related models
export interface ToastConfig {
  message: string;
  duration?: number;
  color?: 'success' | 'warning' | 'danger' | 'primary';
  position?: 'top' | 'bottom' | 'middle';
}

export interface ModalConfig {
  title?: string;
  component: any;
  componentProps?: any;
  breakpoints?: number[];
  initialBreakpoint?: number;
}

// 📊 Common utility types
export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
  lastUpdated?: string;
}

// 🎯 Feature-specific models can be exported from here
// This creates a single source of truth for all application models
