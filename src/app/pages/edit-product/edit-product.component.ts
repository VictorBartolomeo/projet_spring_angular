import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClient} from '@angular/common/http';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {ProductService} from '../../services/repository/product.service';
import {UploadComponent} from '../../components/upload/upload.component';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-edit-product',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButton, ReactiveFormsModule, FormsModule, UploadComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})

export class EditProductComponent implements OnInit {

  http = inject(HttpClient);
  activatedRoute = inject(ActivatedRoute);
  notification = inject(NotificationService);
  router = inject(Router);
  productService = inject(ProductService);

  labels: Label[] = [];
  states: State[] = [];
  products: Product[] = [];
  editedProduct: Product | null = null;
  picture: File | null = null;

  ngOnInit() {
    this.activatedRoute.params.subscribe(parameter => {
      if (parameter['id']) {
        this.http.get<Product>(environment.serveurUrl +`/product/${parameter['id']}`)
          .subscribe(product => {
            this.form.patchValue(product)
            this.editedProduct = product;
          })
      }
    });

    this.http.get<Product[]>(environment.serveurUrl + "/products")
      .subscribe(products => {
        this.products = products;
      })
    this.http.get<Label[]>(environment.serveurUrl + "/labels")
      .subscribe(labels => {
        this.labels = labels;
      })
    this.http.get<State[]>(environment.serveurUrl + "/states")
      .subscribe(states => {
        this.states = states;
      });
  }

  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    name: ['PineApple Intelligence', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]],
    code: ['PINEAI1664', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    description: ['Delayed but not deleted, should it be ? May it be.', []],
    price: [99.99, [Validators.required, Validators.min(0.1)]],
    state: [{id: 1}],
    labels: [[] as Label[]]
  })

  onSubmitEdit() {
    if (this.editedProduct) {
      this.onEditProduct()
    } else {
      const formData = new FormData();
      formData.set("product", new Blob([JSON.stringify(this.form.value)], {type: "application/json"}));
      console.log(this.picture)
      if (this.picture) {

        formData.set("picture", this.picture!);
      }

      this.http.post(environment.serveurUrl + "/product", formData).subscribe(product => console.log("OK"));
      // this.onAddProduct()
    }
  }

  onAddProduct() {
    if (this.form.valid) {
      this.productService
        .addProduct(this.form.value)
        .subscribe(
          {
            next: () => this.notification.showTop("Product added!", "valid"),
            error: () => this.notification.showTop("Internal Error!", "error"),

          })
      this.router.navigateByUrl("/home")
    }
  }

  onEditProduct() {
    if (this.form.valid) {
      if (this.editedProduct) {
        this.productService
          .editProduct(this.editedProduct.id, this.form.value)
          .subscribe(
            {
              next: () => this.notification.showTop("Product added!", "valid"),
              error: () => this.notification.showTop("Internal Error!", "error"),

            })
        this.router.navigateByUrl("/home")
      }
    }
  }

  compareId(o1: { id: number }, o2: { id: number }): boolean {
    return o1.id === o2.id;
  }

  onFileSelected(file: File |null) {
    this.picture = file;
    console.log(this.picture)
  }
}
