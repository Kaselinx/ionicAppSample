// 🎯 Angular Core Imports - Essential Angular functionality
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// 📱 Ionic UI Components - Mobile-optimized components for building native-like interfaces
// These components automatically adapt to iOS and Android design patterns
import {
  IonHeader,        // Top header section of the modal
  IonToolbar,       // Container for title and buttons in header
  IonTitle,         // Page/modal title display
  IonContent,       // Main scrollable content area
  IonButton,        // Interactive button component
  IonButtons,       // Container for multiple buttons (usually in header)
  IonIcon,          // Icon display component (uses Ionicons library)
  IonCard,          // Card container for grouping related content
  IonCardHeader,    // Header section of a card
  IonCardTitle,     // Title within a card header
  IonCardContent,   // Main content area of a card
  IonItem,          // List item component for displaying data in rows
  IonLabel,         // Text label component with built-in styling
  IonChip,          // Small badge/tag component for categories or status
  ModalController   // 🎭 Service for creating and managing modal dialogs
} from '@ionic/angular/standalone';

// 🎭 ModalController Explanation:
// ModalController is a service that manages modal dialogs (popup windows)
// - create(): Creates a new modal with specified component and properties
// - present(): Shows the modal on screen with animations
// - dismiss(): Closes the modal and returns data to parent component
// - onDidDismiss(): Listens for when modal is closed
// Modals are perfect for detailed views, forms, or confirmation dialogs
// 🎨 Ionicons - Icon system for Ionic applications
import { addIcons } from 'ionicons';
import {
  closeOutline,              // X icon for closing modal
  personOutline,             // Person icon for author information
  calendarOutline,           // Calendar icon for date information
  documentTextOutline,       // Document icon for description/summary
  informationCircleOutline   // Info icon for details section
} from 'ionicons/icons';

// 🎨 Ionicons Explanation:
// Ionicons is a premium icon library designed specifically for Ionic apps
// - Provides 1,300+ icons in outline, filled, and sharp variants
// - Icons automatically adapt to platform (iOS vs Android styling)
// - addIcons() registers icons for use in templates
// - Icons are referenced by name in templates: <ion-icon name="close-outline">

// 📋 Import the SearchResult interface - Defines the data structure
// This ensures type safety when passing data between components
import { SearchResult } from './tab2.page';

// 🏗️ Component Decorator - Defines this as an Angular component
// Components are the building blocks of Angular applications
@Component({
  selector: 'app-detail-modal',    // HTML tag name: <app-detail-modal></app-detail-modal>
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>{{ searchResult?.title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="closeModal()" fill="clear">
            <ion-icon name="close-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="detail-content">
      <div class="detail-container" *ngIf="searchResult">
        
        <!-- Title Card -->
        <ion-card class="title-card">
          <ion-card-header>
            <ion-card-title>{{ searchResult.title }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-chip [color]="getCategoryColor(searchResult.category)">
              {{ searchResult.category }}
            </ion-chip>
          </ion-card-content>
        </ion-card>

        <!-- Details Card -->
        <ion-card class="details-card">
          <ion-card-header>
            <ion-card-title>
              <ion-icon name="information-circle-outline"></ion-icon>
              Details
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            
            <!-- Author -->
            <ion-item lines="none" class="detail-item">
              <ion-icon name="person-outline" slot="start" color="primary"></ion-icon>
              <ion-label>
                <h3>Author</h3>
                <p>{{ searchResult.author }}</p>
              </ion-label>
            </ion-item>

            <!-- Date -->
            <ion-item lines="none" class="detail-item">
              <ion-icon name="calendar-outline" slot="start" color="primary"></ion-icon>
              <ion-label>
                <h3>Date</h3>
                <p>{{ formatDate(searchResult.date) }}</p>
              </ion-label>
            </ion-item>

            <!-- Description -->
            <ion-item lines="none" class="detail-item">
              <ion-icon name="document-text-outline" slot="start" color="primary"></ion-icon>
              <ion-label>
                <h3>Description</h3>
                <p>{{ searchResult.description }}</p>
              </ion-label>
            </ion-item>

          </ion-card-content>
        </ion-card>

        <!-- Summary Card -->
        <ion-card class="summary-card">
          <ion-card-header>
            <ion-card-title>
              <ion-icon name="document-text-outline"></ion-icon>
              Summary
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p class="summary-text">{{ searchResult.summary }}</p>
          </ion-card-content>
        </ion-card>

      </div>
    </ion-content>
  `,
  styles: [`
    .detail-content {
      --background: #f8fafc;
    }

    .detail-container {
      padding: 16px;
    }

    .title-card {
      margin-bottom: 16px;
    }

    .title-card ion-card-title {
      color: var(--ion-color-primary);
      font-size: 1.4rem;
      font-weight: 600;
    }

    .details-card, .summary-card {
      margin-bottom: 16px;
    }

    .detail-item {
      --background: transparent;
      --padding-start: 0;
      margin-bottom: 12px;
    }

    .detail-item ion-label h3 {
      color: var(--ion-color-primary);
      font-weight: 600;
      margin-bottom: 4px;
    }

    .detail-item ion-label p {
      color: var(--ion-color-dark);
      font-size: 1rem;
    }

    .summary-text {
      line-height: 1.6;
      color: var(--ion-color-dark);
      font-size: 1rem;
    }

    ion-card-title {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    ion-card-title ion-icon {
      color: var(--ion-color-primary);
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonChip
  ]
})
// 🎯 DetailModalComponent Class - Manages the detailed view modal
export class DetailModalComponent {

  // 📥 Input Property - Receives data from parent component
  // @Input() decorator allows parent component to pass data to this modal
  // The '?' makes it optional and 'SearchResult' ensures type safety
  @Input() searchResult?: SearchResult;

  // 🏗️ Constructor - Dependency Injection and Initialization
  // Angular automatically provides instances of services we request
  constructor(
    private modalController: ModalController  // 🎭 Service for managing this modal
  ) {
    // 🎨 Register icons for use in the template
    // This makes the icons available to use in HTML with <ion-icon name="...">
    addIcons({
      closeOutline,              // For the close button in header
      personOutline,             // For author information display
      calendarOutline,           // For date information display
      documentTextOutline,       // For description and summary sections
      informationCircleOutline   // For the details section header
    });
  }

  // 🚪 Close Modal Method - Dismisses the modal dialog
  // async/await ensures the modal closes completely before continuing
  async closeModal() {
    // modalController.dismiss() closes the modal with optional return data
    // The modal animates out and is removed from the DOM
    await this.modalController.dismiss();
  }

  // 📅 Format Date Method - Converts date string to readable format
  // Takes raw date string (e.g., "2023-01-01") and formats it nicely
  formatDate(dateString: string): string {
    // Create JavaScript Date object from string
    const date = new Date(dateString);

    // Use built-in toLocaleDateString for consistent formatting
    // Returns format like "January 1, 2023"
    return date.toLocaleDateString('en-US', {
      year: 'numeric',    // Full year (2023)
      month: 'long',      // Full month name (January)
      day: 'numeric'      // Day number (1)
    });
  }

  // 🎨 Get Category Color Method - Returns appropriate color for category chips
  // This provides visual consistency and helps users quickly identify content types
  getCategoryColor(category: string): string {
    // Use switch statement for clean category-to-color mapping
    switch (category.toLowerCase()) {
      case 'tutorial':
        return 'primary';    // Red color for tutorials
      case 'guide':
        return 'secondary';  // Light red for guides
      case 'reference':
        return 'tertiary';   // Dark red for reference materials
      default:
        return 'medium';     // Gray for unknown categories
    }
  }
}
