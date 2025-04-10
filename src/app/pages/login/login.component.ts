import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButton,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {

  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);

  notification = inject(NotificationService);


  form = this.formBuilder.group({
    email: ['a@a.com', [Validators.required, Validators.email]],
    password: ['root', [Validators.required]],
  })

  onConnexion() {
    if (this.form.valid) {
      this.http.post("http://localhost:8080/login", this.form.value, {responseType: "text"}).subscribe({
        next: jwt => localStorage.setItem('jwt', jwt),
        error: error => {
          if (error.status === 401) {
            this.notification.showTop("NO NO JOSÉ", "error")
          }
        }
      })
    }
  }
}
