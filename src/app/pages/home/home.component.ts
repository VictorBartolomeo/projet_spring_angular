import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatCardContent} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatCardContent,
    MatDivider,
    MatMenuModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  http = inject(HttpClient);
  products: any = [];
  ngOnInit(){
    this.http.get("http://localhost:8080/products")
      .subscribe(products => {this.products = products;})
  }


  onClick(products: any){
    alert("Vous avez payé " + products.price + "€ pour un " + products.name)
  }
}
