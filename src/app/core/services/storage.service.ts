import { Injectable } from '@angular/core';

// 💾 Storage Service - Centralized local storage management
// This service provides type-safe local storage operations
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // 💾 Set item in localStorage with JSON serialization
  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Failed to save item to localStorage:`, error);
    }
  }

  // 📖 Get item from localStorage with JSON deserialization
  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Failed to get item from localStorage:`, error);
      return null;
    }
  }

  // 🗑️ Remove item from localStorage
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove item from localStorage:`, error);
    }
  }

  // 🧹 Clear all localStorage data
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Failed to clear localStorage:`, error);
    }
  }

  // ✅ Check if key exists in localStorage
  hasItem(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  // 📊 Get all keys in localStorage
  getAllKeys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        keys.push(key);
      }
    }
    return keys;
  }

  // 📏 Get localStorage usage info
  getStorageInfo(): { used: number; available: number; total: number } {
    let used = 0;
    
    // Calculate used space
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        used += localStorage[key].length + key.length;
      }
    }

    // Estimate total available space (usually 5-10MB)
    const total = 5 * 1024 * 1024; // 5MB estimate
    const available = total - used;

    return {
      used,
      available,
      total
    };
  }
}

// 🔑 Storage Keys - Centralized key management
export const STORAGE_KEYS = {
  // Authentication
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  REMEMBER_ME: 'remember_me',
  
  // App Settings
  THEME: 'app_theme',
  LANGUAGE: 'app_language',
  NOTIFICATIONS: 'notification_settings',
  
  // Feature Data
  SEARCH_HISTORY: 'search_history',
  FAVORITES: 'user_favorites',
  CACHE_TIMESTAMP: 'cache_timestamp',
  
  // Temporary Data
  FORM_DRAFT: 'form_draft',
  LAST_ROUTE: 'last_route'
} as const;

// 💡 Usage Examples:
// 
// // In a service:
// constructor(private storage: StorageService) {}
// 
// saveUserPreferences(preferences: UserPreferences) {
//   this.storage.setItem(STORAGE_KEYS.USER_PREFERENCES, preferences);
// }
// 
// getUserPreferences(): UserPreferences | null {
//   return this.storage.getItem<UserPreferences>(STORAGE_KEYS.USER_PREFERENCES);
// }
// 
// clearUserData() {
//   this.storage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
//   this.storage.removeItem(STORAGE_KEYS.USER_DATA);
// }
