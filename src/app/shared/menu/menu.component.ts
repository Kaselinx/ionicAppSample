import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
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
  AlertController
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
import { AuthService } from '../../services/auth.service';

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
export class MenuComponent {
  @Input() triggerId: string = 'menu-trigger';

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
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
  }

  // 🧭 Navigation method for tab switching
  navigateToTab(route: string) {
    this.router.navigate([route]);
  }

  async showSettings() {
    const alert = await this.alertController.create({
      header: 'Settings',
      message: 'Settings functionality coming soon!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async showHelp() {
    const alert = await this.alertController.create({
      header: 'Help & Support',
      message: 'For support, please contact: support@tsapp.com',
      buttons: ['OK']
    });
    await alert.present();
  }

  async showAbout() {
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
            await this.authService.logout();
            this.router.navigate(['/login'], { replaceUrl: true });
          }
        }
      ]
    });
    await alert.present();
  }
}
