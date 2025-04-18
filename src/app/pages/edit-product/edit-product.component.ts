import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClient} from '@angular/common/http';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-edit-product',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButton, ReactiveFormsModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})

export class EditProductComponent implements OnInit {

  http = inject(HttpClient);
  activatedRoute = inject(ActivatedRoute);
  notification = inject(NotificationService);

  labels: Label[] = [];
  states: State[] = [];
  products: Product[] = [];
  editedProduct: Product | null = null;

  ngOnInit() {
    this.activatedRoute.params.subscribe(parameter => {
      if (parameter['id']) {
        this.http.get<Product>(`http://localhost:8080/product/${parameter['id']}`)
          .subscribe(product => {
            this.form.patchValue(product)
            this.editedProduct = product;
          })
      }
    });

    this.http.get<Product[]>("http://localhost:8080/products")
      .subscribe(products => {
        this.products = products;
      })
    this.http.get<Label[]>("http://localhost:8080/labels")
      .subscribe(labels => {
        this.labels = labels;
      })
    this.http.get<State[]>("http://localhost:8080/states")
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
      this.onAddProduct()
    }
  }

  onAddProduct() {
    if (this.form.valid) {
      console.log(this.form.value)
      this.http.post("http://localhost:8080/product", this.form.value)
        .subscribe((result) => {
          this.notification.showTop("Product added!", "valid")
        });
    }
  }

  onEditProduct() {
    if (this.form.valid) {
      if (this.editedProduct) {
        console.log(this.form.value)
        this.http.put(`http://localhost:8080/product/${this.editedProduct.id}`, this.form.value)
          .subscribe((result) => {
            this.notification.showTop("Product edited!", "valid")
          });
      }
    }
  }

  compareId(o1: { id: number }, o2: { id: number }): boolean {
    return o1.id === o2.id;
  }
}
