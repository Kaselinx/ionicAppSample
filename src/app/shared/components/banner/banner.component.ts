import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

// 🎯 Banner Component - Custom banner for announcements and notifications
@Component({
  selector: 'app-banner',
  template: `
    <ion-card class="banner-card" [ngClass]="'banner-' + type">
      <ion-card-content class="banner-content">
        <div class="banner-main">
          <!-- Icon (optional) -->
          <ion-icon 
            *ngIf="icon" 
            [name]="icon" 
            class="banner-icon">
          </ion-icon>
          
          <!-- Content -->
          <div class="banner-text">
            <h3 *ngIf="title" class="banner-title">{{ title }}</h3>
            <p *ngIf="message" class="banner-message">{{ message }}</p>
            <ng-content></ng-content>
          </div>
          
          <!-- Close button (optional) -->
          <ion-button 
            *ngIf="dismissible" 
            fill="clear" 
            size="small" 
            class="banner-close"
            (click)="onDismiss()">
            <ion-icon name="close-outline"></ion-icon>
          </ion-button>
        </div>
        
        <!-- Action button (optional) -->
        <ion-button 
          *ngIf="actionText" 
          [color]="actionColor || 'primary'"
          size="small"
          class="banner-action"
          (click)="onAction()">
          {{ actionText }}
        </ion-button>
      </ion-card-content>
    </ion-card>
  `,
  styles: [`
    .banner-card {
      margin: 16px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .banner-content {
      padding: 16px;
    }

    .banner-main {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .banner-icon {
      font-size: 24px;
      margin-top: 2px;
      flex-shrink: 0;
    }

    .banner-text {
      flex: 1;
    }

    .banner-title {
      margin: 0 0 4px 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--ion-color-dark);
    }

    .banner-message {
      margin: 0;
      font-size: 0.9rem;
      line-height: 1.4;
      color: var(--ion-color-medium);
    }

    .banner-close {
      --padding-start: 8px;
      --padding-end: 8px;
      margin: -8px -8px -8px 0;
    }

    .banner-action {
      margin-top: 12px;
      width: 100%;
    }

    /* Banner Types */
    .banner-info {
      --ion-card-background: #e3f2fd;
      border-left: 4px solid var(--ion-color-primary);
    }

    .banner-info .banner-icon {
      color: var(--ion-color-primary);
    }

    .banner-success {
      --ion-card-background: #e8f5e8;
      border-left: 4px solid var(--ion-color-success);
    }

    .banner-success .banner-icon {
      color: var(--ion-color-success);
    }

    .banner-warning {
      --ion-card-background: #fff3e0;
      border-left: 4px solid var(--ion-color-warning);
    }

    .banner-warning .banner-icon {
      color: var(--ion-color-warning);
    }

    .banner-danger {
      --ion-card-background: #ffebee;
      border-left: 4px solid var(--ion-color-danger);
    }

    .banner-danger .banner-icon {
      color: var(--ion-color-danger);
    }

    .banner-primary {
      --ion-card-background: linear-gradient(135deg, var(--ion-color-primary) 0%, var(--ion-color-primary-tint) 100%);
      color: white;
    }

    .banner-primary .banner-title,
    .banner-primary .banner-message {
      color: white;
    }

    .banner-primary .banner-icon {
      color: white;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonCardContent,
    IonIcon,
    IonButton
  ]
})
export class BannerComponent {
  @Input() type: 'info' | 'success' | 'warning' | 'danger' | 'primary' = 'info';
  @Input() title?: string;
  @Input() message?: string;
  @Input() icon?: string;
  @Input() dismissible: boolean = false;
  @Input() actionText?: string;
  @Input() actionColor?: string;

  constructor() {
    addIcons({ closeOutline });
  }

  onDismiss() {
    // Emit dismiss event or handle dismissal
    console.log('Banner dismissed');
  }

  onAction() {
    // Emit action event
    console.log('Banner action clicked');
  }
}

// 💡 Usage Examples:
// 
// Basic banner:
// <app-banner 
//   type="info" 
//   title="Welcome!" 
//   message="Welcome to your dashboard">
// </app-banner>
// 
// Banner with icon and action:
// <app-banner 
//   type="primary" 
//   title="New Feature Available" 
//   message="Check out our latest update"
//   icon="rocket-outline"
//   actionText="Learn More"
//   [dismissible]="true">
// </app-banner>
// 
// Custom content banner:
// <app-banner type="success">
//   <h3>Custom Content</h3>
//   <p>You can put any content here!</p>
// </app-banner>
