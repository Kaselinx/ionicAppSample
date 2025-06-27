import { Pipe, PipeTransform } from '@angular/core';

// 📏 Truncate Pipe - Truncate long text with ellipsis
// Usage: {{ longText | truncate:50 }} or {{ longText | truncate:50:'...' }}
@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  
  /**
   * Transform text by truncating it to specified length
   * @param value - Text to truncate
   * @param limit - Maximum length (default: 100)
   * @param suffix - Suffix to add when truncated (default: '...')
   * @returns Truncated text
   */
  transform(value: string, limit: number = 100, suffix: string = '...'): string {
    if (!value) return '';
    
    if (value.length <= limit) {
      return value;
    }
    
    return value.substring(0, limit - suffix.length) + suffix;
  }
}

// 💡 Usage Examples:
// 
// In template:
// {{ 'This is a very long text that needs to be truncated' | truncate:20 }}
// Result: "This is a very lo..."
// 
// {{ description | truncate:50:'...' }}
// {{ title | truncate:30:'→' }}
