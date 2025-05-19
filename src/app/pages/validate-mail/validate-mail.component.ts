import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-validate-mail',
  imports: [],
  templateUrl: './validate-mail.component.html',
  styleUrl: './validate-mail.component.scss'
})
export class ValidateMailComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  http = inject(HttpClient)
  notification = inject(NotificationService)
  router = inject(Router)
  token?: string;

  ngOnInit() {
    this.activatedRoute.params.subscribe(parameter => {
      if (parameter['token']) {
        this.token = parameter['token']
      }
    });
  }

  onValidateRegister() {
    if(this.token){
          this.http.post<{ token: string, CGU: boolean }>('http://localhost:8080/validate-email/' +this.token, {token : this.token, CGU: true})
            .subscribe({
              next : (result) => {
                this.notification.showTop("Email validated", "valid")
                this.router.navigateByUrl("/login")
              }}
            )
        }
      }
    }
