import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonChip,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  personOutline, 
  callOutline, 
  mailOutline, 
  locationOutline,
  searchOutline,
  filterOutline
} from 'ionicons/icons';
import { MenuComponent } from '../../../shared/components';

// 👤 Author Search - Specialized search for authors
@Component({
  selector: 'app-author-search',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar color="primary">
        <ion-title>Author Search</ion-title>
        <app-menu slot="end" triggerId="author-search-menu"></app-menu>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="author-search-container">
        
        <!-- Search Type Selector -->
        <ion-segment [(ngModel)]="searchType" (ionChange)="onSearchTypeChange()">
          <ion-segment-button value="name">
            <ion-icon name="person-outline"></ion-icon>
            <ion-label>Name</ion-label>
          </ion-segment-button>
          <ion-segment-button value="phone">
            <ion-icon name="call-outline"></ion-icon>
            <ion-label>Phone</ion-label>
          </ion-segment-button>
          <ion-segment-button value="email">
            <ion-icon name="mail-outline"></ion-icon>
            <ion-label>Email</ion-label>
          </ion-segment-button>
          <ion-segment-button value="address">
            <ion-icon name="location-outline"></ion-icon>
            <ion-label>Address</ion-label>
          </ion-segment-button>
        </ion-segment>

        <!-- Search Input -->
        <div class="search-section">
          <ion-searchbar 
            [(ngModel)]="searchQuery"
            [placeholder]="getSearchPlaceholder()"
            (ionInput)="onSearchInput($event)"
            (ionClear)="onSearchClear()"
            show-clear-button="focus">
          </ion-searchbar>
        </div>

        <!-- Advanced Filters -->
        <ion-card class="filters-card" *ngIf="showAdvancedFilters">
          <ion-card-header>
            <ion-card-title>
              <ion-icon name="filter-outline"></ion-icon>
              Advanced Filters
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="stacked">Country</ion-label>
              <ion-select [(ngModel)]="filters.country" placeholder="Select Country">
                <ion-select-option value="us">United States</ion-select-option>
                <ion-select-option value="uk">United Kingdom</ion-select-option>
                <ion-select-option value="ca">Canada</ion-select-option>
                <ion-select-option value="au">Australia</ion-select-option>
              </ion-select>
            </ion-item>
            
            <ion-item>
              <ion-label position="stacked">Genre Specialization</ion-label>
              <ion-select [(ngModel)]="filters.genre" placeholder="Select Genre">
                <ion-select-option value="fiction">Fiction</ion-select-option>
                <ion-select-option value="non-fiction">Non-Fiction</ion-select-option>
                <ion-select-option value="mystery">Mystery</ion-select-option>
                <ion-select-option value="romance">Romance</ion-select-option>
                <ion-select-option value="sci-fi">Science Fiction</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-card-content>
        </ion-card>

        <!-- Toggle Advanced Filters -->
        <div class="filter-toggle">
          <ion-button 
            fill="clear" 
            (click)="toggleAdvancedFilters()">
            <ion-icon name="filter-outline" slot="start"></ion-icon>
            {{ showAdvancedFilters ? 'Hide' : 'Show' }} Advanced Filters
          </ion-button>
        </div>

        <!-- Search Results -->
        <div class="results-section" *ngIf="searchResults.length > 0">
          <h3>Search Results ({{ searchResults.length }})</h3>
          
          <ion-card *ngFor="let author of searchResults" class="author-result-card">
            <ion-card-header>
              <ion-card-title>{{ author.name }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <div class="author-details">
                <div class="detail-item" *ngIf="author.phone">
                  <ion-icon name="call-outline"></ion-icon>
                  <span>{{ author.phone }}</span>
                </div>
                <div class="detail-item" *ngIf="author.email">
                  <ion-icon name="mail-outline"></ion-icon>
                  <span>{{ author.email }}</span>
                </div>
                <div class="detail-item" *ngIf="author.address">
                  <ion-icon name="location-outline"></ion-icon>
                  <span>{{ author.address }}</span>
                </div>
              </div>
              
              <div class="author-genres" *ngIf="author.genres">
                <ion-chip *ngFor="let genre of author.genres" color="primary">
                  {{ genre }}
                </ion-chip>
              </div>
              
              <div class="author-actions">
                <ion-button size="small" fill="outline" (click)="viewAuthorDetails(author)">
                  View Details
                </ion-button>
                <ion-button size="small" fill="outline" (click)="viewAuthorBooks(author)">
                  View Books
                </ion-button>
              </div>
            </ion-card-content>
          </ion-card>
        </div>

        <!-- No Results -->
        <div class="no-results" *ngIf="hasSearched && searchResults.length === 0">
          <ion-icon name="search-outline"></ion-icon>
          <h3>No authors found</h3>
          <p>Try adjusting your search criteria or filters</p>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .author-search-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    ion-segment {
      margin-bottom: 20px;
    }

    .search-section {
      margin-bottom: 20px;
    }

    .filters-card {
      margin-bottom: 20px;
      
      ion-card-title {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }

    .filter-toggle {
      text-align: center;
      margin-bottom: 20px;
    }

    .results-section h3 {
      color: var(--ion-color-primary);
      margin-bottom: 20px;
    }

    .author-result-card {
      margin-bottom: 16px;
      
      .author-details {
        margin-bottom: 15px;
        
        .detail-item {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          
          ion-icon {
            color: var(--ion-color-medium);
            font-size: 1rem;
          }
          
          span {
            color: var(--ion-color-dark);
          }
        }
      }
      
      .author-genres {
        margin-bottom: 15px;
        
        ion-chip {
          margin-right: 8px;
          margin-bottom: 8px;
        }
      }
      
      .author-actions {
        display: flex;
        gap: 10px;
      }
    }

    .no-results {
      text-align: center;
      padding: 40px 20px;
      color: var(--ion-color-medium);
      
      ion-icon {
        font-size: 4rem;
        margin-bottom: 20px;
      }
      
      h3 {
        margin-bottom: 10px;
      }
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonChip,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    MenuComponent
  ]
})
export class AuthorSearchPage implements OnInit {
  searchType: string = 'name';
  searchQuery: string = '';
  showAdvancedFilters: boolean = false;
  hasSearched: boolean = false;
  
  filters = {
    country: '',
    genre: ''
  };

  searchResults: any[] = [];

  // Mock data for demonstration
  private mockAuthors = [
    {
      id: 1,
      name: 'Stephen King',
      phone: '+1-555-0123',
      email: 'stephen.king@email.com',
      address: 'Bangor, Maine, USA',
      genres: ['Horror', 'Thriller', 'Fantasy']
    },
    {
      id: 2,
      name: 'J.K. Rowling',
      phone: '+44-555-0456',
      email: 'jk.rowling@email.com',
      address: 'Edinburgh, Scotland, UK',
      genres: ['Fantasy', 'Young Adult']
    }
  ];

  constructor() {
    addIcons({
      personOutline,
      callOutline,
      mailOutline,
      locationOutline,
      searchOutline,
      filterOutline
    });
  }

  ngOnInit() {
    console.log('Author Search page initialized');
  }

  getSearchPlaceholder(): string {
    switch (this.searchType) {
      case 'name': return 'Enter author name...';
      case 'phone': return 'Enter phone number...';
      case 'email': return 'Enter email address...';
      case 'address': return 'Enter address or location...';
      default: return 'Search authors...';
    }
  }

  onSearchTypeChange() {
    this.searchQuery = '';
    this.searchResults = [];
    this.hasSearched = false;
  }

  onSearchInput(event: any) {
    const query = event.target.value;
    if (query && query.length > 2) {
      this.performSearch(query);
    }
  }

  onSearchClear() {
    this.searchResults = [];
    this.hasSearched = false;
  }

  toggleAdvancedFilters() {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  performSearch(query: string) {
    this.hasSearched = true;
    
    // Mock search logic
    this.searchResults = this.mockAuthors.filter(author => {
      switch (this.searchType) {
        case 'name':
          return author.name.toLowerCase().includes(query.toLowerCase());
        case 'phone':
          return author.phone.includes(query);
        case 'email':
          return author.email.toLowerCase().includes(query.toLowerCase());
        case 'address':
          return author.address.toLowerCase().includes(query.toLowerCase());
        default:
          return false;
      }
    });
  }

  viewAuthorDetails(author: any) {
    console.log('View author details:', author);
    // Navigate to author details page
  }

  viewAuthorBooks(author: any) {
    console.log('View author books:', author);
    // Navigate to author's books
  }
}
