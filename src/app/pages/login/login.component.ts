import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../services/notification.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {environment} from '../../../environments/environment';

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
  router = inject(Router)
  auth = inject(AuthService);


  form = this.formBuilder.group({
    email: ['a@a.com', [Validators.required, Validators.email]],
    password: ['root', [Validators.required]],
  })

  onConnection() {
    if (this.form.valid) {
      this.http.post(environment.serveurUrl + "/login", this.form.value, {responseType: "text"}).subscribe({
        next: jwt => {
          this.router.navigateByUrl('/home')
          this.auth.decodeJwt(jwt)
        },
        error: error => {
          if (error.status === 401) {
            this.notification.showTop("NO NO JOSÉ", "error")
          }
        }
      })
    }
  }

}
