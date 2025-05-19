import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {RouterLink} from '@angular/router';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {NgStyle} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {ProductService} from '../../services/repository/product.service';
import {MatCardImage} from '@angular/material/card';
import {SecuredImgDirective} from '../../components/secured-img.directive';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatDivider,
    MatMenuModule,
    RouterLink,
    MatChipSet,
    MatChip,
    MatIconModule,
    NgStyle,
    MatCardImage,
    SecuredImgDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  auth = inject(AuthService)
  productService = inject(ProductService)
  products:Product[]=[];
  ImgEnvironment= environment;

  ngOnInit() {
    this.productService.getAll()
    this.productService.products$.subscribe(products => {
      this.products = products
    })
  }


  onClick(products: any) {
    alert("You've just payed " + products.price + "€ for " + products.name)
  }
}
