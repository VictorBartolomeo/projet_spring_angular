import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notification = inject(MatSnackBar)

  showTop(message: string, type: "valid" | "error" | "warning" | "info" = "info") {
    this.notification.open(message, "dismiss", {duration: 5000, verticalPosition: "top", panelClass: type})
  }

  showBottom(message: string, type: "valid" | "error" | "warning" | "info" = "info") {
    this.notification.open(message, "dismiss", {duration: 5000, verticalPosition: "bottom", panelClass: type})
  }
}
