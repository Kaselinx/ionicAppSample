// 🛡️ Route Guards - Control access to routes based on authentication
// Similar to [Authorize] attributes in ASP.NET Core or @PreAuthorize in Spring Security
// These run before a route is activated and can prevent navigation

import { Injectable } from '@angular/core';           // Angular DI decorator
import { CanActivate, Router } from '@angular/router'; // Route guard interface and navigation
import { AuthService } from '../services/auth.service'; // Authentication service

// 🔐 Authentication Guard - Protects routes that require login
// This is like requiring authentication for certain controller actions
@Injectable({
  providedIn: 'root'  // Singleton service
})
export class AuthGuard implements CanActivate {

  // 🏗️ Constructor with dependency injection
  constructor(
    private authService: AuthService,  // Service to check auth status
    private router: Router            // Service to redirect if needed
  ) {
    console.log('🛡️ AuthGuard constructor - Authentication guard initialized');
  }

  // 🔍 CanActivate Method - Called before route activation
  // Returns Promise<boolean> - true allows navigation, false blocks it
  // Similar to authorization logic in backend controllers
  async canActivate(): Promise<boolean> {
    console.log('🛡️ AuthGuard.canActivate() - Checking if user can access protected route');

    // Check if user is currently logged in
    const isLoggedIn = await this.authService.isLoggedIn();
    console.log('🔍 Auth status for protected route:', isLoggedIn);

    if (!isLoggedIn) {
      // ❌ User not logged in - redirect to login page
      console.log('❌ User not authenticated, redirecting to login...');
      this.router.navigate(['/login'], { replaceUrl: true });
      return false;  // Block navigation to protected route
    }

    // ✅ User is logged in - allow access to protected route
    console.log('✅ User authenticated, allowing access to protected route');
    return true;
  }
}

// 🚪 Login Guard - Prevents logged-in users from seeing login page
// This prevents confusion when users try to access login while already logged in
@Injectable({
  providedIn: 'root'  // Singleton service
})
export class LoginGuard implements CanActivate {

  // 🏗️ Constructor with dependency injection
  constructor(
    private authService: AuthService,  // Service to check auth status
    private router: Router            // Service to redirect if needed
  ) {
    console.log('🚪 LoginGuard constructor - Login guard initialized');
  }

  // 🔍 CanActivate Method - Called before accessing login page
  // Prevents already logged-in users from seeing login page again
  async canActivate(): Promise<boolean> {
    console.log('🚪 LoginGuard.canActivate() - Checking if user should see login page');

    // Check if user is currently logged in
    const isLoggedIn = await this.authService.isLoggedIn();
    console.log('🔍 Auth status for login page access:', isLoggedIn);

    if (isLoggedIn) {
      // ✅ User already logged in - redirect to main app
      console.log('✅ User already authenticated, redirecting to main app...');
      this.router.navigate(['/tabs'], { replaceUrl: true });
      return false;  // Block access to login page
    }

    // ❌ User not logged in - allow access to login page
    console.log('❌ User not authenticated, allowing access to login page');
    return true;
  }
}
