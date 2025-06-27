import { Injectable } from '@angular/core';
import { 
  ToastController, 
  AlertController, 
  LoadingController, 
  ModalController 
} from '@ionic/angular/standalone';
import { ToastConfig, ModalConfig } from '../models';

// 🎨 UI Service - Centralized UI operations and notifications
// This service provides consistent UI interactions across the app
@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private toastController: ToastController,     // 🍞 Toast notifications
    private alertController: AlertController,     // ⚠️ Alert dialogs
    private loadingController: LoadingController, // ⏳ Loading spinners
    private modalController: ModalController      // 🎭 Modal dialogs
  ) {}

  // 🍞 Show Toast Notification - Quick feedback messages
  async showToast(config: ToastConfig | string): Promise<void> {
    // Handle both string and config object inputs
    const toastConfig: ToastConfig = typeof config === 'string' 
      ? { message: config } 
      : config;

    const toast = await this.toastController.create({
      message: toastConfig.message,
      duration: toastConfig.duration || 3000,
      color: toastConfig.color || 'primary',
      position: toastConfig.position || 'bottom',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ]
    });

    await toast.present();
  }

  // ✅ Success Toast - Green success message
  async showSuccess(message: string): Promise<void> {
    await this.showToast({
      message,
      color: 'success',
      duration: 2000
    });
  }

  // ❌ Error Toast - Red error message
  async showError(message: string): Promise<void> {
    await this.showToast({
      message,
      color: 'danger',
      duration: 4000
    });
  }

  // ⚠️ Warning Toast - Orange warning message
  async showWarning(message: string): Promise<void> {
    await this.showToast({
      message,
      color: 'warning',
      duration: 3000
    });
  }

  // 🔔 Confirmation Alert - Yes/No dialog
  async showConfirmation(
    title: string, 
    message: string,
    confirmText: string = 'Confirm',
    cancelText: string = 'Cancel'
  ): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: title,
        message: message,
        buttons: [
          {
            text: cancelText,
            role: 'cancel',
            handler: () => resolve(false)
          },
          {
            text: confirmText,
            handler: () => resolve(true)
          }
        ]
      });

      await alert.present();
    });
  }

  // ℹ️ Information Alert - Simple info dialog
  async showInfo(title: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  // ⏳ Loading Spinner - Show/hide loading indicator
  private currentLoading: HTMLIonLoadingElement | null = null;

  async showLoading(message: string = 'Loading...'): Promise<void> {
    // Dismiss any existing loading first
    if (this.currentLoading) {
      await this.hideLoading();
    }

    this.currentLoading = await this.loadingController.create({
      message,
      spinner: 'crescent'
    });

    await this.currentLoading.present();
  }

  async hideLoading(): Promise<void> {
    if (this.currentLoading) {
      await this.currentLoading.dismiss();
      this.currentLoading = null;
    }
  }

  // 🎭 Modal Management - Create and present modals
  async presentModal(config: ModalConfig): Promise<any> {
    const modal = await this.modalController.create({
      component: config.component,
      componentProps: config.componentProps,
      breakpoints: config.breakpoints || [0, 0.5, 0.8, 1],
      initialBreakpoint: config.initialBreakpoint || 0.8
    });

    await modal.present();
    
    // Return the result when modal is dismissed
    const { data } = await modal.onDidDismiss();
    return data;
  }

  // 🚪 Dismiss all modals
  async dismissAllModals(): Promise<void> {
    await this.modalController.dismiss();
  }
}

// 💡 Usage Examples:
// 
// // In a component:
// constructor(private ui: UiService) {}
// 
// async saveData() {
//   await this.ui.showLoading('Saving...');
//   try {
//     await this.dataService.save();
//     await this.ui.showSuccess('Data saved successfully!');
//   } catch (error) {
//     await this.ui.showError('Failed to save data');
//   } finally {
//     await this.ui.hideLoading();
//   }
// }
// 
// async deleteItem() {
//   const confirmed = await this.ui.showConfirmation(
//     'Delete Item', 
//     'Are you sure you want to delete this item?'
//   );
//   if (confirmed) {
//     // Delete the item
//   }
// }
