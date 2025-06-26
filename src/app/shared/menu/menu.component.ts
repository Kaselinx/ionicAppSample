import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButtons,
  IonButton,
  IonIcon,
  IonPopover,
  IonList,
  IonItem,
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
  logOutOutline
} from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  template: `
    <ion-buttons>
      <ion-button [id]="triggerId" fill="clear">
        <ion-icon name="menu-outline"></ion-icon>
      </ion-button>
    </ion-buttons>

    <!-- Menu Popover -->
    <ion-popover [trigger]="triggerId" triggerAction="click">
      <ng-template>
        <ion-content>
          <ion-list>
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
            
            <ion-item button (click)="logout()">
              <ion-icon name="log-out-outline" slot="start"></ion-icon>
              <ion-label>Logout</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ng-template>
    </ion-popover>
  `,
  standalone: true,
  imports: [
    IonButtons,
    IonButton,
    IonIcon,
    IonPopover,
    IonList,
    IonItem,
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
      logOutOutline
    });
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
