import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-register',
    imports: [
        FormsModule,
        MatButton,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  notification = inject(NotificationService);
  router = inject(Router)
  auth = inject(AuthService);


  form = this.formBuilder.group({
    email: ['a@a.com', [Validators.required, Validators.email]],
    password: ['root', [Validators.required]],
  })

  onRegister() {
    if (this.form.valid) {
      this.http.post(environment.serveurUrl + "/register", this.form.value).subscribe({
        next: jwt => {
          this.router.navigateByUrl('/login')
          this.notification.showTop("Confirmation mail sent to provided e-mail", "warning")
        },
        error: error => {
          if (error.status === 409) {
            this.notification.showTop("Conflict with e-mail, internal error", "error")
          }
        }
      })
    }
  }


  onClick(products: any) {
    alert("You've just payed " + products.price + "€ for " + products.name)
  }
}
