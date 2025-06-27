import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingState } from '../models';

// 🏗️ Base Service - Common functionality for all services
// This provides a foundation that other services can extend
@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  
  // 📊 Loading state management - Track loading, errors, and last update
  protected loadingState$ = new BehaviorSubject<LoadingState>({
    isLoading: false,
    error: undefined,
    lastUpdated: undefined
  });

  // 🔍 Public observable for components to subscribe to loading state
  public readonly loading$ = this.loadingState$.asObservable();

  // 🔄 Set loading state - Call when starting async operations
  protected setLoading(isLoading: boolean, error?: string): void {
    this.loadingState$.next({
      isLoading,
      error,
      lastUpdated: isLoading ? undefined : new Date().toISOString()
    });
  }

  // ✅ Set success state - Call when operation completes successfully
  protected setSuccess(): void {
    this.setLoading(false);
  }

  // ❌ Set error state - Call when operation fails
  protected setError(error: string): void {
    this.setLoading(false, error);
  }

  // 🧹 Clear error state - Reset error to undefined
  protected clearError(): void {
    const currentState = this.loadingState$.value;
    this.loadingState$.next({
      ...currentState,
      error: undefined
    });
  }

  // 📊 Get current loading state - Synchronous access to current state
  protected getCurrentState(): LoadingState {
    return this.loadingState$.value;
  }

  // 🔄 Wrapper for async operations with automatic loading state management
  protected async executeWithLoading<T>(
    operation: () => Promise<T>,
    errorMessage: string = 'An error occurred'
  ): Promise<T | null> {
    try {
      this.setLoading(true);
      const result = await operation();
      this.setSuccess();
      return result;
    } catch (error) {
      console.error(errorMessage, error);
      this.setError(errorMessage);
      return null;
    }
  }
}

// 💡 Usage Example:
// @Injectable({ providedIn: 'root' })
// export class UserService extends BaseService {
//   async getUsers(): Promise<User[]> {
//     return this.executeWithLoading(
//       () => this.http.get<User[]>('/api/users').toPromise(),
//       'Failed to load users'
//     );
//   }
// }
