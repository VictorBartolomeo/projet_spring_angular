import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {NotfoundComponent} from './pages/notfound/notfound.component';
import {EditProductComponent} from './pages/edit-product/edit-product.component';
import {loggedGuard} from './services/logged.guard';
import {sellerGuard} from './services/seller.guard';
import {ValidateMailComponent} from './pages/validate-mail/validate-mail.component';

export const routes: Routes = [
  {path: "home", component: HomeComponent, canActivate: [loggedGuard]},
  {path: "login", component: LoginComponent},
  {path: "add-product", component: EditProductComponent, canActivate: [sellerGuard]},
  {path: "edit-product/:id", component: EditProductComponent, canActivate: [sellerGuard]},
  {path: "validate-mail/:token", component: ValidateMailComponent},
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "**", component: NotfoundComponent},
];

