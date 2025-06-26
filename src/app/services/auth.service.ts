// 🔐 Authentication Service - Handles user login/logout and token management
// This is similar to a Service class in Spring Boot or a Service in ASP.NET Core

import { Injectable } from '@angular/core';                    // Angular DI decorator (like @Service in Spring)
import { BehaviorSubject, Observable } from 'rxjs';           // Reactive programming (like C# IObservable)
import { Preferences } from '@capacitor/preferences';         // Secure storage for mobile (like SharedPreferences/Keychain)
import { HttpClient } from '@angular/common/http';            // HTTP client (like HttpClient in .NET or RestTemplate in Spring)

// 📋 TypeScript Interfaces - Similar to C# interfaces or Java POJOs
// These provide compile-time type checking and IntelliSense

export interface User {
  id: string;           // User identifier (like Long id in Java entities)
  username: string;     // Username for display
  email?: string;       // Optional email (? means nullable, like string? in C#)
}

export interface LoginCredentials {
  username: string;     // Login form data
  password: string;     // Plain text password (encrypt in real apps!)
}

export interface AuthResponse {
  success: boolean;     // Operation result flag
  token?: string;       // JWT token (optional, like Optional<String> in Java)
  user?: User;          // User data if login successful
  message?: string;     // Error message if login failed
}

// 🏗️ @Injectable Decorator - Marks this class for Dependency Injection
// Similar to @Service in Spring Boot or [Service] attribute in ASP.NET Core
// 'providedIn: root' makes this a singleton (like @Singleton in Java)
@Injectable({
  providedIn: 'root'  // Singleton scope - one instance for entire app
})
export class AuthService {

  // 📡 BehaviorSubject - Reactive state management (like C# IObservable + current value)
  // Think of it as a "smart variable" that notifies all subscribers when it changes
  // Similar to PropertyChangedNotification in WPF or Observable in Java
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  // 🔍 Public Observables - Read-only streams for components to subscribe to
  // Components can watch these for changes (reactive programming)
  // Like exposing IObservable<T> properties in C# MVVM
  public currentUser$ = this.currentUserSubject.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // 🌐 Backend API URL - Replace with your actual backend endpoint
  // In real apps, put this in environment configuration (like appsettings.json)
  private apiUrl = 'http://localhost:3000/api';

  // 🏗️ Constructor with Dependency Injection
  // Angular automatically injects HttpClient (like @Autowired in Spring)
  constructor(private http: HttpClient) {
    console.log('🔐 AuthService constructor - Initializing authentication service');

    // Load any stored authentication data on service creation
    // This runs once when the app starts (singleton behavior)
    this.loadStoredAuth();
  }

  // 🔑 Login Method - Main authentication entry point
  // async/await pattern (same as C# async/await or CompletableFuture in Java)
  // Returns Promise<AuthResponse> (like Task<AuthResponse> in C#)
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log('🔑 Login attempt started for user:', credentials.username);

    try {
      // 📡 Backend Communication - Replace simulation with real HTTP call
      // In real app: const response = await this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).toPromise();
      console.log('📡 Calling backend authentication...');
      const response = await this.simulateLogin(credentials);

      console.log('📋 Authentication response received:', {
        success: response.success,
        hasToken: !!response.token,
        hasUser: !!response.user
      });

      // 🎯 If login successful, store auth data and update reactive state
      if (response.success && response.token && response.user) {
        console.log('✅ Login successful, storing auth data...');

        // Store token and user data securely (like saving to database in backend)
        await this.setAuthData(response.token, response.user);

        // 📡 Update reactive streams - all subscribers will be notified automatically
        // This is like firing PropertyChanged events in C# or notifying observers in Java
        this.currentUserSubject.next(response.user);        // Update current user
        this.isAuthenticatedSubject.next(true);             // Update auth status

        console.log('🔄 Reactive state updated - components will be notified');
      } else {
        console.log('❌ Login failed:', response.message);
      }

      return response;
    } catch (error) {
      // 🚨 Error handling - similar to try/catch in Java/C#
      console.error('❌ Login error occurred:', error);
      return {
        success: false,
        message: 'Login failed. Please try again.'
      };
    }
  }

  // 🚪 Logout Method - Clean up authentication state
  // Promise<void> is like Task in C# or CompletableFuture<Void> in Java
  async logout(): Promise<void> {
    console.log('🚪 Logout process started');

    try {
      // 🧹 Clear stored authentication data from secure storage
      // This is like deleting session data or clearing cookies
      console.log('🧹 Removing stored auth token...');
      await Preferences.remove({ key: 'auth_token' });

      console.log('🧹 Removing stored user data...');
      await Preferences.remove({ key: 'user_data' });

      // 📡 Update reactive streams to notify all subscribers of logout
      // All components watching these streams will automatically update
      console.log('🔄 Updating reactive state for logout...');
      this.currentUserSubject.next(null);        // Clear current user
      this.isAuthenticatedSubject.next(false);   // Set auth status to false

      console.log('✅ Logout completed successfully');
    } catch (error) {
      // 🚨 Handle any errors during logout (shouldn't happen, but good practice)
      console.error('❌ Logout error:', error);
    }
  }

  // 🔍 Check Authentication Status - Utility method
  // Returns Promise<boolean> (like Task<bool> in C#)
  async isLoggedIn(): Promise<boolean> {
    console.log('🔍 Checking if user is logged in...');

    try {
      // Check if auth token exists in secure storage
      const token = await Preferences.get({ key: 'auth_token' });
      const isLoggedIn = !!token.value;  // !! converts to boolean (like bool.Parse in C#)

      console.log('🔍 Login status check result:', isLoggedIn);
      return isLoggedIn;
    } catch (error) {
      console.error('❌ Error checking login status:', error);
      return false;  // Default to not logged in on error
    }
  }

  // 👤 Get Current User - Synchronous getter method
  // Returns the current value from BehaviorSubject (like a property getter in C#)
  getCurrentUser(): User | null {
    const user = this.currentUserSubject.value;
    console.log('👤 Getting current user:', user?.username || 'No user');
    return user;
  }

  private async loadStoredAuth(): Promise<void> {
    try {
      const tokenResult = await Preferences.get({ key: 'auth_token' });
      const userResult = await Preferences.get({ key: 'user_data' });
      
      if (tokenResult.value && userResult.value) {
        const user = JSON.parse(userResult.value);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    }
  }

  private async setAuthData(token: string, user: User): Promise<void> {
    try {
      await Preferences.set({ key: 'auth_token', value: token });
      await Preferences.set({ key: 'user_data', value: JSON.stringify(user) });
    } catch (error) {
      console.error('Error storing auth data:', error);
    }
  }

  // 🎭 Simulate login for demo purposes
  // 🔄 Replace this with actual HTTP call to your backend
  // 📡 Example: return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).toPromise();
  private async simulateLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log('🎭 Simulating login for demo purposes...');
    console.log('📝 Login credentials:', {
      username: credentials.username,
      password: '***' // Don't log actual passwords!
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('⏳ Simulating network delay (1 second)...');

        // 🔍 Simple demo validation - Replace with real backend validation
        if (credentials.username === 'demo' && credentials.password === 'password') {
          console.log('✅ Demo credentials valid - Login successful');

          const response: AuthResponse = {
            success: true,
            token: 'demo_token_' + Date.now(), // Generate unique token
            user: {
              id: '1',
              username: credentials.username,
              email: 'demo@example.com'
            }
          };

          console.log('🎫 Generated auth response:', {
            success: response.success,
            token: response.token?.substring(0, 20) + '...', // Partial token for security
            user: response.user
          });

          resolve(response);
        } else {
          console.log('❌ Invalid credentials - Login failed');
          resolve({
            success: false,
            message: 'Invalid username or password'
          });
        }
      }, 1000); // 🕐 Simulate network delay (1000ms = 1 second)
    });
  }

  // Method to make authenticated HTTP requests
  async getAuthToken(): Promise<string | null> {
    try {
      const result = await Preferences.get({ key: 'auth_token' });
      return result.value;
    } catch (error) {
      return null;
    }
  }

  // Example method for backend communication
  async fetchUserData(): Promise<any> {
    const token = await this.getAuthToken();
    if (!token) {
      throw new Error('No auth token available');
    }

    return this.http.get(`${this.apiUrl}/user`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).toPromise();
  }
}
