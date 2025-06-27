import { Component, Input, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  IonButtons,
  IonButton,
  IonIcon,
  IonPopover,
  IonList,
  IonItem,
  IonItemGroup,
  IonItemDivider,
  IonLabel,
  IonContent,
  AlertController,
  PopoverController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  menuOutline,
  settingsOutline,
  helpCircleOutline,
  informationCircleOutline,
  logOutOutline,
  homeOutline,
  searchOutline,
  notificationsOutline,
  personOutline
} from 'ionicons/icons';
import { AuthService } from '../../../core/services';

@Component({
  selector: 'app-menu',
  template: `
    <ion-buttons>
      <ion-button [id]="triggerId" fill="clear">
        <ion-icon name="menu-outline" size="large"></ion-icon>
      </ion-button>
    </ion-buttons>

    <!-- Menu Popover -->
    <ion-popover [trigger]="triggerId" triggerAction="click">
      <ng-template>
        <ion-content>
          <ion-list>
            <!-- Navigation Section -->
            <ion-item-group>
              <ion-item-divider>
                <ion-label>Navigation</ion-label>
              </ion-item-divider>

              <ion-item button (click)="navigateToTab('/tabs/tab1')">
                <ion-icon name="home-outline" slot="start"></ion-icon>
                <ion-label>Home</ion-label>
              </ion-item>

              <ion-item button (click)="navigateToTab('/tabs/tab2')">
                <ion-icon name="search-outline" slot="start"></ion-icon>
                <ion-label>Search</ion-label>
              </ion-item>

              <ion-item button (click)="navigateToTab('/tabs/tab3')">
                <ion-icon name="notifications-outline" slot="start"></ion-icon>
                <ion-label>Notifications</ion-label>
              </ion-item>

              <ion-item button (click)="navigateToTab('/tabs/tab4')">
                <ion-icon name="person-outline" slot="start"></ion-icon>
                <ion-label>Profile</ion-label>
              </ion-item>
            </ion-item-group>

            <!-- Settings Section -->
            <ion-item-group>
              <ion-item-divider>
                <ion-label>Settings</ion-label>
              </ion-item-divider>

              <ion-item button (click)="showSettings()">
                <ion-icon name="settings-outline" slot="start"></ion-icon>
                <ion-label>Settings</ion-label>
              </ion-item>

              <ion-item button (click)="showHelp()">
                <ion-icon name="help-circle-outline" slot="start"></ion-icon>
                <ion-label>Help & Support</ion-label>
              </ion-item>

              <ion-item button (click)="showAbout()">
                <ion-icon name="information-circle-outline" slot="start"></ion-icon>
                <ion-label>About</ion-label>
              </ion-item>
            </ion-item-group>

            <!-- Account Section -->
            <ion-item-group>
              <ion-item-divider>
                <ion-label>Account</ion-label>
              </ion-item-divider>

              <ion-item button (click)="logout()">
                <ion-icon name="log-out-outline" slot="start"></ion-icon>
                <ion-label>Logout</ion-label>
              </ion-item>
            </ion-item-group>
          </ion-list>
        </ion-content>
      </ng-template>
    </ion-popover>
  `,
  styles: [`
    ion-item-divider {
      --background: var(--ion-color-light);
      --color: var(--ion-color-primary);
      font-weight: 600;
      font-size: 0.9rem;
    }

    ion-item {
      --padding-start: 16px;
      --inner-padding-end: 16px;
    }

    ion-item:hover {
      --background: var(--ion-color-light-tint);
    }

    ion-popover {
      --width: 250px;
    }
  `],
  standalone: true,
  imports: [
    IonButtons,
    IonButton,
    IonIcon,
    IonPopover,
    IonList,
    IonItem,
    IonItemGroup,
    IonItemDivider,
    IonLabel,
    IonContent
  ]
})
export class MenuComponent implements OnDestroy {
  @Input() triggerId: string = 'menu-trigger';

  // 🔄 Subscription management for cleanup
  private navigationSubscription: Subscription | null = null;

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private popoverController: PopoverController
  ) {
    addIcons({
      menuOutline,
      settingsOutline,
      helpCircleOutline,
      informationCircleOutline,
      logOutOutline,
      homeOutline,
      searchOutline,
      notificationsOutline,
      personOutline
    });

    // 🔄 Subscribe to navigation events to auto-close menu
    this.setupNavigationListener();
  }

  // 🧹 Cleanup method - Called when component is destroyed
  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  // 🔄 Setup navigation listener to auto-close menu on route changes
  private setupNavigationListener(): void {
    this.navigationSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        // Close any open popovers when navigation occurs
        this.closeMenu();
      });
  }

  // 🚪 Close menu method - Dismisses any open popovers
  private async closeMenu(): Promise<void> {
    try {
      await this.popoverController.dismiss();
    } catch (error) {
      // Ignore errors if no popover is open
    }
  }

  // 🧭 Navigation method for tab switching
  async navigateToTab(route: string) {
    // 🚪 Close menu before navigation
    await this.closeMenu();

    // 🧭 Navigate to the selected tab
    this.router.navigate([route]);
  }

  async showSettings() {
    // 🚪 Close menu first
    await this.closeMenu();

    const alert = await this.alertController.create({
      header: 'Settings',
      message: 'Settings functionality coming soon!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async showHelp() {
    // 🚪 Close menu first
    await this.closeMenu();

    const alert = await this.alertController.create({
      header: 'Help & Support',
      message: 'For support, please contact: support@tsapp.com',
      buttons: ['OK']
    });
    await alert.present();
  }

  async showAbout() {
    // 🚪 Close menu first
    await this.closeMenu();

    const alert = await this.alertController.create({
      header: 'About TSApp',
      message: 'TSApp v1.0.0\nIonic Angular Capacitor Hybrid App\nBuilt with ❤️',
      buttons: ['OK']
    });
    await alert.present();
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Logout',
          handler: async () => {
            // 🚪 Close menu first to prevent it staying open
            await this.closeMenu();

            // 🔐 Perform logout
            await this.authService.logout();

            // 🧭 Navigate to login page
            this.router.navigate(['/login'], { replaceUrl: true });
          }
        }
      ]
    });
    await alert.present();
  }
}
