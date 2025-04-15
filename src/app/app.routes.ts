import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {NotfoundComponent} from './pages/notfound/notfound.component';
import {EditProductComponent} from './pages/edit-product/edit-product.component';
import {loggedGuard} from './services/logged.guard';

export const routes: Routes = [
  {path: "home", component: HomeComponent, canActivate: [loggedGuard]},
  {path: "login", component: LoginComponent},
  {path: "add-product", component: EditProductComponent, canActivate: [loggedGuard]},
  {path: "edit-product/:id", component: EditProductComponent, canActivate: [loggedGuard]},
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "**", component: NotfoundComponent},
];

