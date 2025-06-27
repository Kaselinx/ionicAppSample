import { Pipe, PipeTransform } from '@angular/core';

// ⏰ Relative Time Pipe - Convert dates to relative time (e.g., "2 hours ago")
// Usage: {{ dateString | relativeTime }}
@Pipe({
  name: 'relativeTime',
  standalone: true
})
export class RelativeTimePipe implements PipeTransform {
  
  /**
   * Transform date string to relative time
   * @param value - ISO date string
   * @returns Relative time string (e.g., "2 hours ago", "3 days ago")
   */
  transform(value: string): string {
    if (!value) return '';
    
    try {
      const date = new Date(value);
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
      
      // Handle future dates
      if (diffInSeconds < 0) {
        const futureDiff = Math.abs(diffInSeconds);
        if (futureDiff < 60) return 'In a moment';
        if (futureDiff < 3600) return `In ${Math.floor(futureDiff / 60)} minutes`;
        if (futureDiff < 86400) return `In ${Math.floor(futureDiff / 3600)} hours`;
        if (futureDiff < 2592000) return `In ${Math.floor(futureDiff / 86400)} days`;
        return 'In the future';
      }
      
      // Past dates
      if (diffInSeconds < 60) return 'Just now';
      if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
      }
      if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
      }
      if (diffInSeconds < 2592000) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day${days === 1 ? '' : 's'} ago`;
      }
      if (diffInSeconds < 31536000) {
        const months = Math.floor(diffInSeconds / 2592000);
        return `${months} month${months === 1 ? '' : 's'} ago`;
      }
      
      const years = Math.floor(diffInSeconds / 31536000);
      return `${years} year${years === 1 ? '' : 's'} ago`;
      
    } catch (error) {
      console.error('Invalid date in RelativeTimePipe:', value);
      return 'Unknown time';
    }
  }
}

// 💡 Usage Examples:
// 
// In template:
// {{ user.lastLoginAt | relativeTime }}
// Result: "2 hours ago"
// 
// {{ post.createdAt | relativeTime }}
// Result: "3 days ago"
// 
// {{ event.scheduledAt | relativeTime }}
// Result: "In 2 hours" (for future dates)
