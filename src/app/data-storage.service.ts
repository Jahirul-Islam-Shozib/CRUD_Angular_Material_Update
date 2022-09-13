import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  storeData() {
    const productData = this.productService.getProductItems();
    this.http
      .put(
        'https://new-crud-5ef9f-default-rtdb.firebaseio.com/productData.json',
        productData
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  fetchData() {
    return this.http
      .get<ProductModel[]>(
        'https://new-crud-5ef9f-default-rtdb.firebaseio.com/productData.json'
      )
      .pipe(
        tap((productData) => {
          this.productService.setProductDatas(productData);
        })
      );
  }
}
