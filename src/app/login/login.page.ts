// 🔐 Login Page Component - Handles user authentication UI
// This is like a Controller in MVC or a Component in React
// Manages the login form, validation, and user interaction

// 🎯 Core Angular imports - Similar to using statements in C#
import { Component, OnInit } from '@angular/core';    // Component decorator and lifecycle interface
import { CommonModule } from '@angular/common';       // Common directives (*ngIf, *ngFor, pipes)
import { FormsModule } from '@angular/forms';         // Two-way data binding [(ngModel)]
import { Router } from '@angular/router';             // Navigation service (like MVC routing)

// 📱 Ionic UI Components - Mobile-optimized components
// These are like UserControls in WPF or Components in Android
import {
  IonContent,       // Main content container
  IonHeader,        // Page header
  IonTitle,         // Page title
  IonToolbar,       // Toolbar container
  IonCard,          // Card container (like Material Design cards)
  IonCardHeader,    // Card header section
  IonCardTitle,     // Card title
  IonCardContent,   // Card content area
  IonItem,          // List item container
  IonLabel,         // Text label
  IonInput,         // Input field (like TextBox in WPF)
  IonButton,        // Button (like Button in WPF)
  IonIcon,          // Icon display
  IonSpinner,       // Loading spinner
  LoadingController, // Service for showing loading dialogs
  ToastController   // Service for showing toast notifications
} from '@ionic/angular/standalone';

// 🎨 Icon system - Import specific icons to reduce bundle size
import { addIcons } from 'ionicons';
import { logInOutline, personOutline, lockClosedOutline } from 'ionicons/icons';

// 🔐 Custom services and interfaces - Our business logic
import { AuthService, LoginCredentials } from '../services/auth.service';

// 🏗️ Component Decorator - Defines this class as an Angular component
// Similar to [Controller] attribute in ASP.NET MVC or @Controller in Spring
@Component({
  selector: 'app-login',           // HTML tag name: <app-login></app-login>
  templateUrl: './login.page.html', // HTML template file (like a Razor view)
  styleUrls: ['./login.page.scss'], // CSS/SCSS styles (like CSS files)
  standalone: true,                // Modern Angular standalone component (no NgModule needed)
  imports: [                       // Dependencies this component uses (like using statements)
    CommonModule,                  // Angular common directives (*ngIf, *ngFor, etc.)
    FormsModule,                   // Form handling and two-way binding
    IonContent,                    // Ionic components this template uses
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonSpinner
  ]
})
// 🎯 Component Class - Like a ViewModel in MVVM or Controller in MVC
export class LoginPage implements OnInit {

  // 📋 Form Data Model - Bound to the HTML form via two-way binding
  // Similar to a ViewModel property in WPF or model in MVC
  credentials: LoginCredentials = {
    username: '',    // Bound to username input field
    password: ''     // Bound to password input field
  };

  // 🎛️ UI State Properties - Control the appearance and behavior of the UI
  isLoading = false;        // Shows/hides loading spinner (like a boolean property in ViewModel)
  showToast = false;        // Controls toast visibility (not used in current implementation)
  toastMessage = '';        // Toast message text (not used in current implementation)
  toastColor = 'danger';    // Toast color theme (not used in current implementation)

  // 🏗️ Constructor with Dependency Injection
  // Angular automatically injects these services (like @Autowired in Spring or DI in ASP.NET Core)
  constructor(
    private authService: AuthService,        // Service for authentication logic
    private router: Router,                  // Service for navigation between pages
    private loadingController: LoadingController, // Service for showing loading dialogs
    private toastController: ToastController // Service for showing toast notifications
  ) {
    console.log('🔐 LoginPage constructor - Initializing login page');

    // 🎨 Register icons for use in the template
    // This makes the icons available to use in HTML with <ion-icon name="log-in-outline">
    addIcons({ logInOutline, personOutline, lockClosedOutline });
    console.log('🎨 Icons registered for login page');
  }

  // 🚀 Angular Lifecycle Hook - Called after component initialization
  // Similar to Page_Load in ASP.NET WebForms or @PostConstruct in Spring
  ngOnInit() {
    console.log('🚀 LoginPage ngOnInit - Component initialized');

    // Check if user is already logged in and redirect if necessary
    // This prevents showing login page to already authenticated users
    this.checkAuthStatus();
  }

  // 🔍 Check Authentication Status - Prevent showing login to already logged-in users
  // This is like checking if user is authenticated in a controller action
  async checkAuthStatus() {
    console.log('🔍 Checking if user is already logged in...');

    const isLoggedIn = await this.authService.isLoggedIn();
    console.log('🔍 Auth status check result:', isLoggedIn);

    if (isLoggedIn) {
      console.log('✅ User already logged in, redirecting to main app...');
      // replaceUrl: true prevents back button from returning to login
      this.router.navigate(['/tabs'], { replaceUrl: true });
    } else {
      console.log('❌ User not logged in, staying on login page');
    }
  }

  // 🔑 Login Handler - Called when user submits the login form
  // This is the main login method, similar to a login action in MVC controller
  async onLogin() {
    console.log('🔑 Login attempt started');
    console.log('📝 Login credentials:', { username: this.credentials.username, password: '***' });

    // 📋 Validate form data before proceeding
    if (!this.validateForm()) {
      console.log('❌ Form validation failed, aborting login');
      return;
    }

    // ⏳ Show loading indicator to user (UX best practice)
    console.log('⏳ Creating loading indicator...');
    const loading = await this.loadingController.create({
      message: 'Logging in...',    // Message shown to user
      spinner: 'crescent'          // Type of spinner animation
    });
    await loading.present();
    console.log('⏳ Loading indicator displayed');

    try {
      // 📡 Call authentication service to perform login
      console.log('📡 Calling AuthService.login()...');
      const result = await this.authService.login(this.credentials);
      console.log('📋 Login result received:', { success: result.success, message: result.message });

      if (result.success) {
        // ✅ Login successful - show success message and navigate
        console.log('✅ Login successful, showing success toast...');
        await this.showSuccessToast('Login successful!');

        console.log('🧭 Navigating to main app...');
        this.router.navigate(['/tabs'], { replaceUrl: true });
      } else {
        // ❌ Login failed - show error message
        console.log('❌ Login failed, showing error toast...');
        await this.showErrorToast(result.message || 'Login failed');
      }
    } catch (error) {
      // 🚨 Unexpected error during login process
      console.error('🚨 Unexpected login error:', error);
      await this.showErrorToast('An error occurred during login');
    } finally {
      // 🏁 Always dismiss loading indicator (like finally block in try/catch)
      console.log('🏁 Dismissing loading indicator...');
      await loading.dismiss();
    }
  }

  private validateForm(): boolean {
    if (!this.credentials.username.trim()) {
      this.showErrorToast('Please enter your username');
      return false;
    }

    if (!this.credentials.password.trim()) {
      this.showErrorToast('Please enter your password');
      return false;
    }

    if (this.credentials.password.length < 3) {
      this.showErrorToast('Password must be at least 3 characters long');
      return false;
    }

    return true;
  }

  private async showSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    await toast.present();
  }

  private async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'danger',
      position: 'top'
    });
    await toast.present();
  }

  // Demo credentials helper
  fillDemoCredentials() {
    this.credentials.username = 'demo';
    this.credentials.password = 'password';
  }
}
