// 🔍 Search Page Component - Demonstrates testable functionality
// This component shows various features that can be unit tested

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonChip,
  IonSpinner,
  ToastController,
  ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  searchOutline,
  closeOutline,
  personOutline,
  calendarOutline,
  documentTextOutline,
  informationCircleOutline
} from 'ionicons/icons';

// Import services and components
import { MenuComponent } from '../../../shared/components';
import { DetailModalComponent } from '../../../shared/modals';
import { SearchService } from '../services/search.service';

// Import core models
import { SearchResult } from '../../../core/models';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonChip,
    IonSpinner,
    MenuComponent
  ]
})
export class Tab2Page implements OnInit {

  // 📋 Component Properties - These will be tested
  searchTerm = '';                           // Current search input
  searchResults: SearchResult[] = [];        // Search results array
  isLoading = false;                         // Loading state
  hasSearched = false;                       // Whether user has performed a search

  // 📊 Mock data is now handled by SearchService for better separation of concerns

  // 🏗️ Constructor - Dependency Injection for Services
  // Angular's dependency injection system automatically provides these services
  constructor(
    private toastController: ToastController,  // 🍞 Service for showing toast notifications
    private modalController: ModalController,  // 🎭 Service for creating and managing modals
    private searchService: SearchService      // 🔍 Service for search functionality
  ) {

    // 🍞 ToastController Explanation:
    // ToastController creates small, temporary notification messages
    // - create(): Creates a toast with message, duration, color, position
    // - present(): Shows the toast on screen
    // - dismiss(): Manually closes the toast (usually auto-dismisses)
    // Perfect for quick feedback like "Search completed" or "Item selected"

    // 🎭 ModalController Explanation:
    // ModalController manages modal dialogs (popup windows)
    // - create(): Creates modal with component and data
    // - present(): Shows modal with slide-up animation
    // - dismiss(): Closes modal and optionally returns data
    // Great for detailed views, forms, or complex interactions
    // Register icons for use in template
    addIcons({
      searchOutline,
      closeOutline,
      personOutline,
      calendarOutline,
      documentTextOutline,
      informationCircleOutline
    });
  }

  ngOnInit() {
    console.log('🔍 Search page initialized');

    // 📊 Subscribe to search results from the service
    this.searchService.results$.subscribe(results => {
      this.searchResults = results;
      console.log('📊 Search results updated:', results.length);
    });

    // ⏳ Subscribe to loading state from the service
    this.searchService.loading$.subscribe(state => {
      this.isLoading = state.isLoading;
      if (state.error) {
        this.showToast(`Search error: ${state.error}`);
      }
    });
  }

  // 🔍 Search Method - Now uses SearchService for better architecture
  async performSearch(searchTerm: string): Promise<void> {
    console.log('🔍 Performing search for:', searchTerm);

    // Validate input
    if (!searchTerm || searchTerm.trim().length < 2) {
      await this.showToast('Please enter at least 2 characters to search');
      return;
    }

    this.hasSearched = true;

    // Use the search service - it handles loading state automatically
    const results = await this.searchService.search(searchTerm);

    console.log('✅ Search completed, found', results.length, 'results');
  }

  // 🧹 Clear Search - Now uses SearchService
  clearSearch(): void {
    console.log('🧹 Clearing search');
    this.searchTerm = '';
    this.hasSearched = false;

    // Clear results through the service
    this.searchService.clearResults();
  }

  // 📊 Get Search Summary - Computed property to test
  getSearchSummary(): string {
    if (!this.hasSearched) {
      return 'Enter a search term to find results';
    }

    if (this.isLoading) {
      return 'Searching...';
    }

    const count = this.searchResults.length;
    return count === 0
      ? 'No results found'
      : `Found ${count} result${count === 1 ? '' : 's'}`;
  }

  // 🎯 Select Result - Event handler when user taps a search result
  // This method is called from the template when a search result is clicked
  async selectResult(result: SearchResult): Promise<void> {
    console.log('🎯 Selected result:', result.title);
    // Open detailed modal with the selected search result data
    await this.openDetailModal(result);
  }

  // 📋 Open Detail Modal - Creates and displays detailed information modal
  // This demonstrates how to pass data to a modal component
  async openDetailModal(result: SearchResult): Promise<void> {
    // 🎭 Create modal using ModalController
    const modal = await this.modalController.create({
      component: DetailModalComponent,        // Which component to show in modal
      componentProps: {                       // Data to pass to the modal component
        searchResult: result                  // Pass the selected search result
      },
      breakpoints: [0, 0.5, 0.8, 1],        // Responsive breakpoints for modal height
      initialBreakpoint: 0.8                 // Start at 80% screen height
    });

    // 🎬 Present the modal with slide-up animation
    await modal.present();

    // 📝 Optional: Listen for when modal is dismissed
    // const { data } = await modal.onDidDismiss();
    // console.log('Modal dismissed with data:', data);
  }

  // 🔧 Utility Methods - Helper functions to test
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async showToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }

  // 📊 Validation Method - Business logic to test
  isValidSearchTerm(term: string): boolean {
    return !!term && term.trim().length >= 2;
  }


}
