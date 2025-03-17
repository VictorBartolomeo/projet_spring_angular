import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [],
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
}
