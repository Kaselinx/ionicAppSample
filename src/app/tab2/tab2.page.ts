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
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { searchOutline, closeOutline } from 'ionicons/icons';

// 📋 Interface for search results
export interface SearchResult {
  id: number;
  title: string;
  description: string;
  category: string;
}

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
    IonSpinner
  ]
})
export class Tab2Page implements OnInit {

  // 📋 Component Properties - These will be tested
  searchTerm = '';                           // Current search input
  searchResults: SearchResult[] = [];        // Search results array
  isLoading = false;                         // Loading state
  hasSearched = false;                       // Whether user has performed a search

  // 🗄️ Mock data for demonstration
  private mockData: SearchResult[] = [
    { id: 1, title: 'Angular Basics', description: 'Learn Angular fundamentals', category: 'Tutorial' },
    { id: 2, title: 'TypeScript Guide', description: 'Master TypeScript programming', category: 'Guide' },
    { id: 3, title: 'Ionic Components', description: 'Explore Ionic UI components', category: 'Reference' },
    { id: 4, title: 'RxJS Observables', description: 'Reactive programming with RxJS', category: 'Tutorial' },
    { id: 5, title: 'Unit Testing', description: 'Testing Angular applications', category: 'Guide' }
  ];

  constructor(private toastController: ToastController) {
    // Register icons for use in template
    addIcons({ searchOutline, closeOutline });
  }

  ngOnInit() {
    console.log('🔍 Search page initialized');
  }

  // 🔍 Search Method - Main functionality to test
  async performSearch(searchTerm: string): Promise<void> {
    console.log('🔍 Performing search for:', searchTerm);

    // Validate input
    if (!searchTerm || searchTerm.trim().length < 2) {
      await this.showToast('Please enter at least 2 characters to search');
      return;
    }

    this.isLoading = true;
    this.hasSearched = true;

    // Simulate API delay
    await this.delay(500);

    // Filter mock data based on search term
    this.searchResults = this.mockData.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    this.isLoading = false;
    console.log('✅ Search completed, found', this.searchResults.length, 'results');
  }

  // 🧹 Clear Search - Another method to test
  clearSearch(): void {
    console.log('🧹 Clearing search');
    this.searchTerm = '';
    this.searchResults = [];
    this.hasSearched = false;
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

  // 🎯 Select Result - Event handler to test
  selectResult(result: SearchResult): void {
    console.log('🎯 Selected result:', result.title);
    this.showToast(`Selected: ${result.title}`);
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
