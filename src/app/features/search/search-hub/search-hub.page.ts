import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  bookOutline, 
  personOutline, 
  businessOutline,
  searchOutline 
} from 'ionicons/icons';
import { MenuComponent } from '../../../shared/components';

// 🔍 Search Hub - Central landing page for all search types
@Component({
  selector: 'app-search-hub',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar color="primary">
        <ion-title>Search Center</ion-title>
        <app-menu slot="end" triggerId="search-hub-menu"></app-menu>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="search-hub-container">
        <div class="welcome-section">
          <h1>What would you like to search for?</h1>
          <p>Choose a search type to get started</p>
        </div>

        <ion-grid>
          <ion-row>
            <!-- Book Search -->
            <ion-col size="12" size-md="6">
              <ion-card class="search-type-card" button (click)="navigateToBookSearch()">
                <ion-card-header>
                  <ion-card-title>
                    <ion-icon name="book-outline"></ion-icon>
                    Book Search
                  </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  Search for books by title, ISBN, genre, or publication year
                </ion-card-content>
              </ion-card>
            </ion-col>

            <!-- Author Search -->
            <ion-col size="12" size-md="6">
              <ion-card class="search-type-card" button (click)="navigateToAuthorSearch()">
                <ion-card-header>
                  <ion-card-title>
                    <ion-icon name="person-outline"></ion-icon>
                    Author Search
                  </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  Find authors by name, phone number, email, or address
                </ion-card-content>
              </ion-card>
            </ion-col>

            <!-- Publisher Search -->
            <ion-col size="12" size-md="6">
              <ion-card class="search-type-card" button (click)="navigateToPublisherSearch()">
                <ion-card-header>
                  <ion-card-title>
                    <ion-icon name="business-outline"></ion-icon>
                    Publisher Search
                  </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  Search publishers by company name, location, or contact info
                </ion-card-content>
              </ion-card>
            </ion-col>

            <!-- Advanced Search -->
            <ion-col size="12" size-md="6">
              <ion-card class="search-type-card" button (click)="navigateToAdvancedSearch()">
                <ion-card-header>
                  <ion-card-title>
                    <ion-icon name="search-outline"></ion-icon>
                    Advanced Search
                  </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  Multi-criteria search across all content types
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>

        <!-- Quick Actions -->
        <div class="quick-actions">
          <h3>Quick Actions</h3>
          <ion-button fill="outline" (click)="navigateToRecentSearches()">
            <ion-icon name="time-outline" slot="start"></ion-icon>
            Recent Searches
          </ion-button>
          <ion-button fill="outline" (click)="navigateToSavedSearches()">
            <ion-icon name="bookmark-outline" slot="start"></ion-icon>
            Saved Searches
          </ion-button>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .search-hub-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .welcome-section {
      text-align: center;
      margin-bottom: 30px;
      
      h1 {
        color: var(--ion-color-primary);
        margin-bottom: 10px;
      }
      
      p {
        color: var(--ion-color-medium);
        font-size: 1.1rem;
      }
    }

    .search-type-card {
      height: 100%;
      transition: transform 0.2s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      
      ion-card-title {
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--ion-color-primary);
        
        ion-icon {
          font-size: 1.5rem;
        }
      }
      
      ion-card-content {
        color: var(--ion-color-medium);
        line-height: 1.5;
      }
    }

    .quick-actions {
      margin-top: 40px;
      text-align: center;
      
      h3 {
        color: var(--ion-color-dark);
        margin-bottom: 20px;
      }
      
      ion-button {
        margin: 0 10px 10px 0;
      }
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    MenuComponent
  ]
})
export class SearchHubPage {

  constructor(private router: Router) {
    addIcons({
      bookOutline,
      personOutline,
      businessOutline,
      searchOutline
    });
  }

  navigateToBookSearch() {
    this.router.navigate(['/search/books']);
  }

  navigateToAuthorSearch() {
    this.router.navigate(['/search/authors']);
  }

  navigateToPublisherSearch() {
    this.router.navigate(['/search/publishers']);
  }

  navigateToAdvancedSearch() {
    this.router.navigate(['/search/advanced']);
  }

  navigateToRecentSearches() {
    this.router.navigate(['/search/recent']);
  }

  navigateToSavedSearches() {
    this.router.navigate(['/search/saved']);
  }
}
