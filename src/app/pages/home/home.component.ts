import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {RouterLink} from '@angular/router';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {NgStyle} from '@angular/common';

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
    NgStyle
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  http = inject(HttpClient);
  products: Product[]= [];

  ngOnInit() {

    const jwt=localStorage.getItem('jwt');

    if(jwt){

    this.http.get<Product[]>("http://localhost:8080/products", {headers: {Authorization: `Bearer ${jwt}`}})
      .subscribe(products => {
        this.products = products;})
    }
  }

  onClick(products: any) {
    alert("Vous avez payé " + products.price + "€ pour un " + products.name)
  }
}
