// 🌐 API Service - Handles all backend communication
// This is like a Repository or Service layer in your Java/C# backend
// Centralizes HTTP calls and provides a clean interface for components

import { Injectable } from '@angular/core';                    // Angular DI decorator
import { HttpClient, HttpHeaders } from '@angular/common/http'; // HTTP client (like RestTemplate/HttpClient)
import { Observable, of } from 'rxjs';                         // Reactive programming types
import { AuthService } from './auth.service';                  // Dependency on auth service

// 📋 Interface for backend response - Like a DTO in Java/C#
export interface BackendMessage {
  message: string;      // The actual message content
  timestamp: string;    // When the message was created (ISO string)
  status: string;       // Status indicator ('success', 'error', etc.)
}

// 🏗️ Service class with singleton scope
@Injectable({
  providedIn: 'root'    // Singleton - one instance for entire app
})
export class ApiService {

  // 🌐 Backend API base URL - In real apps, use environment configuration
  // This would be like @Value("${api.base.url}") in Spring Boot
  private apiUrl = 'http://localhost:3000/api';

  // 🏗️ Constructor with Dependency Injection
  // Angular automatically injects these services (like @Autowired in Spring)
  constructor(
    private http: HttpClient,      // For making HTTP requests
    private authService: AuthService // For getting auth tokens
  ) {
    console.log('🌐 ApiService constructor - Initializing API service');
    console.log('🔗 API base URL configured:', this.apiUrl);
  }

  // 📡 Get Hello Message - Main API call for displaying backend message
  // This demonstrates authenticated API calls with error handling
  // Returns Promise<BackendMessage> (like Task<BackendMessage> in C#)
  async getHelloMessage(): Promise<BackendMessage> {
    console.log('📡 Getting hello message from backend...');

    try {
      // 🔐 Get authentication token for API call
      // This is like adding Authorization header in your backend API calls
      console.log('🔐 Retrieving auth token...');
      const token = await this.authService.getAuthToken();

      if (!token) {
        console.log('⚠️ No auth token found, returning demo message');
        // Return demo message if no token (user not logged in)
        return this.getDemoMessage();
      }

      // 📋 Prepare HTTP headers - Similar to setting headers in RestTemplate or HttpClient
      console.log('📋 Preparing HTTP headers with auth token...');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,    // JWT token (standard format)
        'Content-Type': 'application/json'    // JSON content type
      });

      // 🌐 Make HTTP GET request to backend
      // 📝 TODO: Replace simulation with real HTTP call:
      // return this.http.get<BackendMessage>(`${this.apiUrl}/hello`, { headers }).toPromise();
      console.log('🎭 Using demo simulation instead of real HTTP call');
      return this.getDemoMessage();

    } catch (error) {
      // 🚨 Error handling - Return user-friendly error message
      console.error('❌ Error fetching hello message:', error);
      return {
        message: 'Error connecting to backend',
        timestamp: new Date().toISOString(),
        status: 'error'
      };
    }
  }

  async getUserProfile(): Promise<any> {
    try {
      const token = await this.authService.getAuthToken();
      
      if (!token) {
        throw new Error('No authentication token');
      }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      // For demo purposes, return simulated data
      // Replace with: return this.http.get(`${this.apiUrl}/profile`, { headers }).toPromise();
      return this.getDemoProfile();
      
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  async updateUserProfile(profileData: any): Promise<any> {
    try {
      const token = await this.authService.getAuthToken();
      
      if (!token) {
        throw new Error('No authentication token');
      }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      // For demo purposes, return simulated response
      // Replace with: return this.http.put(`${this.apiUrl}/profile`, profileData, { headers }).toPromise();
      return {
        success: true,
        message: 'Profile updated successfully',
        data: profileData
      };
      
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  // Demo methods - replace these with actual backend calls
  private getDemoMessage(): BackendMessage {
    const messages = [
      'Hello from the backend! 🚀',
      'Welcome to your Ionic app! 📱',
      'Backend connection successful! ✅',
      'Your app is working perfectly! 🎉',
      'Data loaded from server! 💾'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    return {
      message: randomMessage,
      timestamp: new Date().toISOString(),
      status: 'success'
    };
  }

  private getDemoProfile(): any {
    const currentUser = this.authService.getCurrentUser();
    return {
      id: currentUser?.id || '1',
      username: currentUser?.username || 'demo',
      email: currentUser?.email || 'demo@example.com',
      firstName: 'Demo',
      lastName: 'User',
      avatar: 'https://via.placeholder.com/150',
      joinDate: '2024-01-01',
      lastLogin: new Date().toISOString()
    };
  }

  // Method to test backend connectivity
  async testConnection(): Promise<boolean> {
    try {
      // For demo purposes, always return true
      // Replace with actual ping to your backend
      // const response = await this.http.get(`${this.apiUrl}/ping`).toPromise();
      // return response.status === 'ok';
      
      return true;
    } catch (error) {
      console.error('Backend connection test failed:', error);
      return false;
    }
  }

  // Generic method for making authenticated requests
  async makeAuthenticatedRequest(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', data?: any): Promise<any> {
    try {
      const token = await this.authService.getAuthToken();
      
      if (!token) {
        throw new Error('No authentication token');
      }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      const url = `${this.apiUrl}${endpoint}`;

      switch (method) {
        case 'GET':
          return this.http.get(url, { headers }).toPromise();
        case 'POST':
          return this.http.post(url, data, { headers }).toPromise();
        case 'PUT':
          return this.http.put(url, data, { headers }).toPromise();
        case 'DELETE':
          return this.http.delete(url, { headers }).toPromise();
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }
    } catch (error) {
      console.error(`Error making ${method} request to ${endpoint}:`, error);
      throw error;
    }
  }
}
