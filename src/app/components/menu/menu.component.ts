import {Component, inject} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  imports: [MatMenuModule, RouterLink, RouterLinkActive, MatButton],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  auth = inject(AuthService);

}
