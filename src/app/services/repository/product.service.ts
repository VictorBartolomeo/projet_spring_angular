import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, of, tap, throwError} from 'rxjs';
import {NotificationService} from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient)
  notification = inject(NotificationService)
  readonly products$ = new BehaviorSubject<Product[]>([])


  getAll() {
    return this.http.get<Product[]>("http://localhost:8080/products")
      .subscribe(products => this.products$.next(products))
  }

  addProduct(product: any) {
    return of(this.http.post("http://localhost:8080/product", product)
      .pipe(tap(() => this.getAll()),
        catchError(error => {
          return throwError(error);
        })
      ))
  }

  editProduct(id: number, product: any) {
    return of(this.http.put("http://localhost:8080/product/" + id, product)
      .pipe(tap(() => this.getAll()),
        catchError(error => {
          return throwError(error)
        })
      ))
  }
}
