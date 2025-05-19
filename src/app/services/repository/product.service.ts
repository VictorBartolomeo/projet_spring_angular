import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, of, tap, throwError} from 'rxjs';
import {NotificationService} from '../notification.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient)
  notification = inject(NotificationService)
  readonly products$ = new BehaviorSubject<Product[]>([])


  getAll() {
    return this.http.get<Product[]>(environment.serveurUrl +
      "/products")
      .subscribe(products => this.products$.next(products))
  }

  addProduct(product: any) {
    return of(this.http.post(environment.serveurUrl + "/product", product)
      .pipe(tap(() => this.getAll()),
        catchError(error => {
          return throwError(error);
        })
      ))
  }

  editProduct(id: number, product: any) {
    return of(this.http.put(environment.serveurUrl + "/product/" + id, product)
      .pipe(tap(() => this.getAll()),
        catchError(error => {
          return throwError(error)
        })
      ))
  }
}
