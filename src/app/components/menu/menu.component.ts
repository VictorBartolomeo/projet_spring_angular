import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatSlideToggle, MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-menu',
  imports: [MatMenuModule, RouterLink, RouterLinkActive, MatButton, MatSlideToggle],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

}
