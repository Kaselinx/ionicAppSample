import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { BaseService } from '../../../core/services/base.service';
import { SearchResult, SearchFilters } from '../../../core/models';

// 🔍 Search Service - Manages search functionality and data
// This service extends BaseService to inherit common loading state management
@Injectable({
  providedIn: 'root'
})
export class SearchService extends BaseService {
  
  // 📊 Search state management
  private searchResults$ = new BehaviorSubject<SearchResult[]>([]);
  private searchHistory$ = new BehaviorSubject<string[]>([]);
  private currentQuerySubject$ = new BehaviorSubject<string>('');

  // 🔍 Public observables for components to subscribe to
  public readonly results$ = this.searchResults$.asObservable();
  public readonly history$ = this.searchHistory$.asObservable();
  public readonly currentQuery$ = this.currentQuerySubject$.asObservable();
  
  // 📋 Mock data for demonstration
  private mockData: SearchResult[] = [
    {
      id: 1,
      title: 'Getting Started with Ionic',
      description: 'Learn the basics of building mobile apps with Ionic framework',
      category: 'Tutorial',
      author: 'John Smith',
      date: '2023-12-01',
      summary: 'This comprehensive tutorial covers the fundamentals of Ionic development, including component creation, navigation, and styling. Perfect for beginners looking to build their first mobile app.',
      tags: ['ionic', 'mobile', 'tutorial'],
      url: 'https://example.com/ionic-tutorial'
    },
    {
      id: 2,
      title: 'Advanced Angular Patterns',
      description: 'Deep dive into advanced Angular development patterns and best practices',
      category: 'Guide',
      author: 'Jane Doe',
      date: '2023-11-15',
      summary: 'Explore advanced Angular concepts including reactive forms, custom directives, dependency injection patterns, and performance optimization techniques for enterprise applications.',
      tags: ['angular', 'patterns', 'advanced'],
      url: 'https://example.com/angular-patterns'
    },
    {
      id: 3,
      title: 'TypeScript Best Practices',
      description: 'Essential TypeScript practices for better code quality',
      category: 'Reference',
      author: 'Mike Johnson',
      date: '2023-10-20',
      summary: 'A comprehensive guide to TypeScript best practices covering type definitions, interfaces, generics, and advanced type manipulation for scalable application development.',
      tags: ['typescript', 'best-practices', 'types'],
      url: 'https://example.com/typescript-guide'
    },
    {
      id: 4,
      title: 'Mobile UI/UX Design Principles',
      description: 'Design principles for creating intuitive mobile interfaces',
      category: 'Guide',
      author: 'Sarah Wilson',
      date: '2023-09-10',
      summary: 'Learn essential mobile design principles including touch targets, navigation patterns, responsive design, and accessibility considerations for creating user-friendly mobile applications.',
      tags: ['design', 'mobile', 'ux'],
      url: 'https://example.com/mobile-design'
    },
    {
      id: 5,
      title: 'API Integration Strategies',
      description: 'Best practices for integrating with REST and GraphQL APIs',
      category: 'Tutorial',
      author: 'David Brown',
      date: '2023-08-25',
      summary: 'Master API integration techniques including error handling, caching strategies, authentication, and real-time data synchronization for robust application development.',
      tags: ['api', 'rest', 'graphql'],
      url: 'https://example.com/api-integration'
    }
  ];
  
  constructor() {
    super();
    this.loadSearchHistory();
  }
  
  // 🔍 Perform search with query and optional filters
  async search(query: string, filters?: SearchFilters): Promise<SearchResult[]> {
    const results = await this.executeWithLoading(async () => {
      // Update current query
      this.currentQuerySubject$.next(query);
      
      // Add to search history
      this.addToHistory(query);
      
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter results based on query and filters
      let results = this.mockData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.author.toLowerCase().includes(query.toLowerCase()) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
      );
      
      // Apply additional filters if provided
      if (filters) {
        if (filters.category) {
          results = results.filter(item => 
            item.category.toLowerCase() === filters.category!.toLowerCase()
          );
        }
        
        if (filters.author) {
          results = results.filter(item => 
            item.author.toLowerCase().includes(filters.author!.toLowerCase())
          );
        }
        
        if (filters.dateFrom) {
          results = results.filter(item => 
            new Date(item.date) >= new Date(filters.dateFrom!)
          );
        }
        
        if (filters.dateTo) {
          results = results.filter(item => 
            new Date(item.date) <= new Date(filters.dateTo!)
          );
        }
        
        if (filters.tags && filters.tags.length > 0) {
          results = results.filter(item => 
            item.tags && filters.tags!.some(tag => 
              item.tags!.includes(tag)
            )
          );
        }
      }
      
      // Update results
      this.searchResults$.next(results);
      
      return results;
    }, 'Failed to perform search');

    return results || [];
  }
  
  // 📝 Add query to search history
  private addToHistory(query: string): void {
    if (!query.trim()) return;
    
    const currentHistory = this.searchHistory$.value;
    const updatedHistory = [query, ...currentHistory.filter(h => h !== query)].slice(0, 10);
    
    this.searchHistory$.next(updatedHistory);
    this.saveSearchHistory(updatedHistory);
  }
  
  // 🗑️ Clear search history
  clearHistory(): void {
    this.searchHistory$.next([]);
    localStorage.removeItem('search_history');
  }
  
  // 🔄 Clear current search results
  clearResults(): void {
    this.searchResults$.next([]);
    this.currentQuerySubject$.next('');
  }
  
  // 📊 Get search suggestions based on history and popular terms
  getSearchSuggestions(query: string): Observable<string[]> {
    const history = this.searchHistory$.value;
    const popularTerms = ['ionic', 'angular', 'typescript', 'mobile', 'api'];
    
    const suggestions = [...history, ...popularTerms]
      .filter(term => term.toLowerCase().includes(query.toLowerCase()))
      .filter((term, index, array) => array.indexOf(term) === index) // Remove duplicates
      .slice(0, 5);
    
    return of(suggestions).pipe(delay(100)); // Simulate slight delay
  }
  
  // 📋 Get available categories for filtering
  getCategories(): string[] {
    const categories = [...new Set(this.mockData.map(item => item.category))];
    return categories.sort();
  }
  
  // 👥 Get available authors for filtering
  getAuthors(): string[] {
    const authors = [...new Set(this.mockData.map(item => item.author))];
    return authors.sort();
  }
  
  // 🏷️ Get available tags for filtering
  getTags(): string[] {
    const allTags: string[] = [];
    this.mockData.forEach((item: SearchResult) => {
      if (item.tags) {
        allTags.push(...item.tags);
      }
    });
    const uniqueTags = [...new Set(allTags)];
    return uniqueTags.sort();
  }
  
  // 💾 Save search history to localStorage
  private saveSearchHistory(history: string[]): void {
    try {
      localStorage.setItem('search_history', JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save search history:', error);
    }
  }
  
  // 📖 Load search history from localStorage
  private loadSearchHistory(): void {
    try {
      const saved = localStorage.getItem('search_history');
      if (saved) {
        const history = JSON.parse(saved);
        this.searchHistory$.next(history);
      }
    } catch (error) {
      console.error('Failed to load search history:', error);
    }
  }
}

// 💡 Usage Examples:
// 
// In a component:
// constructor(private searchService: SearchService) {}
// 
// async performSearch() {
//   const results = await this.searchService.search('ionic tutorial');
//   // Results are also available via searchService.results$ observable
// }
// 
// ngOnInit() {
//   // Subscribe to search results
//   this.searchService.results$.subscribe(results => {
//     this.searchResults = results;
//   });
//   
//   // Subscribe to loading state
//   this.searchService.loading$.subscribe(state => {
//     this.isLoading = state.isLoading;
//     this.error = state.error;
//   });
// }
