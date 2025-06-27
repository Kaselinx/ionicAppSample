// 🎯 TypeScript Imports - Auto-compiled to JavaScript
// These imports provide type safety and IntelliSense support
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// 📱 Ionic Components - Standalone imports for better tree-shaking
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonSpinner,
  IonChip,
  IonImg,
  ToastController,
  LoadingController
} from '@ionic/angular/standalone';

// 🎨 Icon imports - Only import what you need for performance
import { addIcons } from 'ionicons';
import {
  serverOutline,
  timeOutline,
  refreshOutline,
  wifiOutline,
  personOutline
} from 'ionicons/icons';

// 🔐 Custom Services - TypeScript interfaces provide type safety
import { AuthService, ApiService } from '../../../core/services';
import { User, BackendMessage } from '../../../core/models';
import { MenuComponent, BannerComponent } from '../../../shared/components';

// 🏗️ Component Decorator - Angular's way to define components
// This gets compiled to JavaScript class with metadata
@Component({
  selector: 'app-tab1',           // 🏷️ HTML tag name: <app-tab1></app-tab1>
  templateUrl: 'tab1.page.html',  // 📄 HTML template file
  styleUrls: ['tab1.page.scss'],  // 🎨 SCSS styles file
  standalone: true,               // 🚀 Modern Angular standalone component
  imports: [                      // 📦 Components/modules this component uses
    CommonModule,                 // Angular common directives (*ngIf, *ngFor, etc.)
    IonHeader,                    // Ionic header component
    IonToolbar,                   // Ionic toolbar component

    IonTitle,                     // Ionic title component
    IonContent,                   // Ionic content container
    IonCard,                      // Ionic card component
    IonCardHeader,                // Ionic card header
    IonCardTitle,                 // Ionic card title
    IonCardSubtitle,              // Ionic card subtitle
    IonCardContent,               // Ionic card content
    IonButton,                    // Ionic button component
    IonIcon,                      // Ionic icon component
    IonSpinner,                   // Ionic loading spinner
    IonChip,                      // Ionic chip component
    IonImg,                       // Ionic image component
    MenuComponent,                // Shared menu component
    BannerComponent               // Custom banner component
  ],
})
// 🎯 TypeScript Class - Gets compiled to JavaScript with type checking
export class Tab1Page implements OnInit {
  // 🔍 TypeScript Properties - Type annotations help with debugging
  currentUser: User | null = null;              // Union type: User object or null
  currentTime = new Date();                     // Date object - auto-inferred type
  backendMessage: BackendMessage | null = null; // Custom interface type
  isLoading = false;                            // Boolean - auto-inferred type

  // 🏗️ Constructor - Dependency Injection (Angular's magic!)
  // TypeScript automatically creates private properties from parameters
  constructor(
    private authService: AuthService,        // 🔐 Authentication service
    private apiService: ApiService,          // 🌐 Backend communication service
    private toastController: ToastController, // 🍞 Ionic toast notifications
    private loadingController: LoadingController // ⏳ Ionic loading spinners
  ) {
    // 🎨 Register icons for use in templates
    // This runs once when component is created
    console.log('🏗️ Tab1Page constructor called - Component being created');
    addIcons({
      serverOutline,           // Server/backend icon
      timeOutline,             // Time/clock icon
      refreshOutline,          // Refresh icon
      wifiOutline,             // WiFi/connection icon
      personOutline            // Person/user icon
    });
  }

  // 🚀 Angular Lifecycle Hook - Called after component initialization
  // This is where you put initialization logic
  ngOnInit() {
    console.log('🚀 ngOnInit called - Component initialized and ready');
    console.log('🔍 Current user on init:', this.currentUser);

    // Load initial data
    this.loadUserData();
    this.loadBackendMessage();

    // ⏰ Update time every minute (60000ms = 60 seconds)
    // This creates a timer that updates the UI automatically
    console.log('⏰ Setting up time update interval');
    setInterval(() => {
      this.currentTime = new Date();
      console.log('🕐 Time updated:', this.currentTime.toLocaleTimeString());
    }, 60000);
  }

  // 🔐 Load User Data - Subscribe to authentication state changes
  // This uses RxJS Observables for reactive programming
  private loadUserData() {
    console.log('🔐 Loading user data from AuthService...');

    // 📡 Subscribe to user changes (reactive programming)
    // This will automatically update when user logs in/out
    this.authService.currentUser$.subscribe(user => {
      console.log('👤 User data received:', user);
      this.currentUser = user;

      // 🔍 Debug: Log user properties
      if (user) {
        console.log('✅ User logged in:', {
          id: user.id,
          username: user.username,
          email: user.email
        });
      } else {
        console.log('❌ No user logged in');
      }
    });
  }

  // 🌐 Load Backend Message - Async/Await for API calls
  // This demonstrates TypeScript async/await syntax
  async loadBackendMessage() {
    console.log('🌐 Loading backend message...');
    console.log('⏳ Setting loading state to true');
    this.isLoading = true;

    try {
      // 📡 API Call - This is where you'd call your real backend
      console.log('📡 Calling ApiService.getHelloMessage()...');
      this.backendMessage = await this.apiService.getHelloMessage();

      // 🔍 Debug: Log the response
      console.log('✅ Backend message loaded successfully:', {
        message: this.backendMessage?.message,
        timestamp: this.backendMessage?.timestamp,
        status: this.backendMessage?.status
      });

    } catch (error) {
      // 🚨 Error Handling - TypeScript helps catch type errors
      console.error('❌ Error loading backend message:', error);
      console.error('🔍 Error details:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace'
      });

      await this.showToast('Failed to load message from backend', 'danger');
    } finally {
      // 🏁 Finally block - Always runs regardless of success/failure
      console.log('🏁 Finished loading backend message, setting loading to false');
      this.isLoading = false;
    }
  }

  // 🔄 Refresh Message - User-triggered action
  // This method is called when user clicks the refresh button
  async refreshMessage() {
    console.log('🔄 User clicked refresh message button');
    console.log('📊 Current state before refresh:', {
      isLoading: this.isLoading,
      hasMessage: !!this.backendMessage,
      currentMessage: this.backendMessage?.message
    });

    // Reload the backend message
    await this.loadBackendMessage();

    // Show success feedback to user
    await this.showToast('Message refreshed!', 'success');
    console.log('✅ Message refresh completed');
  }

  // 🌐 Test Backend Connection - Network connectivity check
  // This demonstrates error handling and user feedback
  async testConnection() {
    console.log('🌐 Testing backend connection...');

    // Show loading indicator to user
    const loading = await this.showLoading('Testing connection...');
    console.log('⏳ Loading indicator shown');

    try {
      // 📡 Test the connection
      console.log('📡 Calling ApiService.testConnection()...');
      const isConnected = await this.apiService.testConnection();
      console.log('🔍 Connection test result:', isConnected);

      // Always dismiss loading first
      await loading.dismiss();
      console.log('✅ Loading indicator dismissed');

      // Show appropriate feedback based on result
      if (isConnected) {
        console.log('✅ Backend connection successful');
        await this.showToast('Backend connection successful!', 'success');
      } else {
        console.log('❌ Backend connection failed');
        await this.showToast('Backend connection failed', 'danger');
      }
    } catch (error) {
      // 🚨 Handle any errors during connection test
      console.error('❌ Connection test threw an error:', error);
      await loading.dismiss();
      await this.showToast('Connection test failed', 'danger');
    }
  }

  // 👤 Refresh User Data - Get latest user profile from backend
  // This shows how to handle API responses and update UI
  async refreshUserData() {
    console.log('👤 Refreshing user data...');

    const loading = await this.showLoading('Refreshing user data...');
    console.log('⏳ Loading indicator shown for user data refresh');

    try {
      // 📡 Get fresh user profile data
      console.log('📡 Calling ApiService.getUserProfile()...');
      const userData = await this.apiService.getUserProfile();

      await loading.dismiss();
      console.log('✅ Loading indicator dismissed');

      // 🔍 Debug: Log the user data structure
      console.log('✅ User data refreshed successfully:', {
        id: userData?.id,
        username: userData?.username,
        email: userData?.email,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        avatar: userData?.avatar,
        joinDate: userData?.joinDate,
        lastLogin: userData?.lastLogin
      });

      await this.showToast('User data refreshed!', 'success');
    } catch (error) {
      // 🚨 Handle errors gracefully
      console.error('❌ Failed to refresh user data:', error);
      await loading.dismiss();
      await this.showToast('Failed to refresh user data', 'danger');
    }
  }



  // 🍞 Show Toast Notification - User feedback helper
  // This is a private utility method for showing messages
  private async showToast(message: string, color: string) {
    console.log(`🍞 Showing ${color} toast:`, message);

    const toast = await this.toastController.create({
      message,           // Text to display
      duration: 2000,    // Show for 2 seconds
      color,            // 'success', 'danger', 'warning', etc.
      position: 'top'   // Show at top of screen
    });

    await toast.present();
    console.log('✅ Toast notification displayed');
  }

  // ⏳ Show Loading Indicator - User feedback for async operations
  // Returns the loading controller so caller can dismiss it
  private async showLoading(message: string) {
    console.log('⏳ Creating loading indicator:', message);

    const loading = await this.loadingController.create({
      message,              // Text to show under spinner
      spinner: 'crescent'   // Type of spinner animation
    });

    await loading.present();
    console.log('✅ Loading indicator displayed');

    // Return the loading controller so caller can dismiss it
    return loading;
  }

  // 🎯 END OF CLASS - All methods above get compiled to JavaScript
  // TypeScript provides type safety, IntelliSense, and better debugging
}
