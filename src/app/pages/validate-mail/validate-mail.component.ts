import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {MatButtonModule} from '@angular/material/button';
import {delay} from 'rxjs';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-validate-mail',
  imports: [
    MatButtonModule
  ],
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
          this.http.post<{ token: string, CGU: boolean }>(environment.serveurUrl + '/validate-email', {token : this.token, CGU: true})
            .subscribe({
              next : (result) => {
                this.notification.showTop("Email validated", "valid")
                this.router.navigateByUrl("/login")
              }
              }
            )
        }
      }
    }
