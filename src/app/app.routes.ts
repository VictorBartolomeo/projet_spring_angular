import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import {EditProductComponent} from './pages/edit-product/edit-product.component';

export const routes: Routes = [
  {path : "home", component : HomeComponent},
  {path : "login", component : LoginComponent},
  {path : "add-product", component : EditProductComponent},
  {path : "edit-product/:id", component : EditProductComponent},
  {path : "", redirectTo :"home", pathMatch :"full"},
  {path : "**", component : NotfoundComponent},
];

