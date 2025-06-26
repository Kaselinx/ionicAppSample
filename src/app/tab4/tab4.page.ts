// 👤 Profile Page Component - User profile and account management
// This page displays user information and provides account-related actions
// Similar to a user profile page in any web application

// 🎯 Core Angular imports
import { Component, OnInit } from '@angular/core';    // Component decorator and lifecycle
import { CommonModule } from '@angular/common';       // Common directives and pipes
import { Router } from '@angular/router';             // Navigation service

// 📱 Ionic UI Components - Mobile-optimized components for profile display
import {
  IonHeader,        // Page header
  IonToolbar,       // Toolbar container
  IonTitle,         // Page title
  IonContent,       // Main content area
  IonCard,          // Card containers for organizing content
  IonCardHeader,    // Card header section
  IonCardTitle,     // Card title
  IonCardContent,   // Card content area
  IonButton,        // Action buttons
  IonButtons,       // Buttons container
  IonIcon,          // Icons for visual elements
  IonItem,          // List items for user details
  IonLabel,         // Text labels
  IonAvatar,        // User profile picture container
  IonList,          // List container
  IonPopover,       // Popover component
  AlertController,  // Service for confirmation dialogs
  ToastController   // Service for notification messages
} from '@ionic/angular/standalone';

// 🎨 Icon imports - Profile-related icons
import { addIcons } from 'ionicons';
import {
  personOutline,           // User/person icon
  mailOutline,             // Email icon
  calendarOutline,         // Calendar/date icon
  timeOutline,             // Time/clock icon
  logOutOutline,           // Logout icon (needed for content buttons)
  settingsOutline,         // Settings icon (needed for content buttons)
  helpCircleOutline,       // Help icon (needed for content buttons)
  informationCircleOutline // Information icon (needed for content buttons)
} from 'ionicons/icons';

// 🔐 Custom services - Business logic and data access
import { AuthService, User } from '../services/auth.service'; // Authentication and user data
import { ApiService } from '../services/api.service';         // Backend communication
import { MenuComponent } from '../shared/menu/menu.component';

// 🏗️ Component Decorator - Defines this as the Profile page component
@Component({
  selector: 'app-tab4',           // HTML tag: <app-tab4></app-tab4>
  templateUrl: 'tab4.page.html',  // HTML template file
  styleUrls: ['tab4.page.scss'],  // SCSS styles file
  standalone: true,               // Modern Angular standalone component
  imports: [                      // Components and modules this component uses
    CommonModule,                 // Angular common directives
    IonHeader,                    // Ionic components for the template
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonAvatar,
    IonList,
    MenuComponent
  ],
})
// 🎯 Profile Page Class - Manages user profile display and actions
export class Tab4Page implements OnInit {

  // 📋 Component State Properties - Data that drives the UI
  currentUser: User | null = null;  // Current logged-in user (from auth service)
  userProfile: any = null;          // Extended user profile data (from API)
  isLoading = false;                // Loading state for UI feedback

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({
      personOutline,
      mailOutline,
      calendarOutline,
      timeOutline,
      logOutOutline,
      settingsOutline,
      helpCircleOutline,
      informationCircleOutline
    });
  }

  ngOnInit() {
    this.loadUserData();
    this.loadUserProfile();
  }

  private loadUserData() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  private async loadUserProfile() {
    this.isLoading = true;
    try {
      this.userProfile = await this.apiService.getUserProfile();
    } catch (error) {
      console.error('Error loading user profile:', error);
      await this.showToast('Failed to load profile data', 'danger');
    } finally {
      this.isLoading = false;
    }
  }



  // 🎛️ Menu Methods - Needed for the action buttons in the profile content
  async showSettings() {
    const alert = await this.alertController.create({
      header: 'Settings',
      message: 'Settings functionality coming soon!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async showHelp() {
    const alert = await this.alertController.create({
      header: 'Help & Support',
      message: 'For support, please contact: support@tsapp.com',
      buttons: ['OK']
    });
    await alert.present();
  }

  async showAbout() {
    const alert = await this.alertController.create({
      header: 'About TSApp',
      message: 'TSApp v1.0.0\nIonic Angular Capacitor Hybrid App\nBuilt with ❤️',
      buttons: ['OK']
    });
    await alert.present();
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Logout',
          handler: async () => {
            await this.authService.logout();
            this.router.navigate(['/login'], { replaceUrl: true });
          }
        }
      ]
    });
    await alert.present();
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }
}
