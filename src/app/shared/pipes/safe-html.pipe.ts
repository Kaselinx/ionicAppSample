import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// 🔒 Safe HTML Pipe - Safely render HTML content
// Usage: {{ htmlContent | safeHtml }}
@Pipe({
  name: 'safeHtml',
  standalone: true
})
export class SafeHtmlPipe implements PipeTransform {
  
  constructor(private sanitizer: DomSanitizer) {}
  
  /**
   * Transform HTML string to safe HTML that can be rendered
   * @param value - HTML string to sanitize
   * @returns SafeHtml object that Angular can render
   */
  transform(value: string): SafeHtml {
    if (!value) return '';
    
    // Sanitize the HTML to prevent XSS attacks
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

// ⚠️ Security Note:
// This pipe bypasses Angular's built-in sanitization.
// Only use with trusted HTML content or content that has been
// properly sanitized on the server side.

// 💡 Usage Examples:
// 
// In template:
// <div [innerHTML]="description | safeHtml"></div>
// 
// For rich text content:
// <div [innerHTML]="blogPost.content | safeHtml"></div>
// 
// For formatted messages:
// <p [innerHTML]="notification.message | safeHtml"></p>
