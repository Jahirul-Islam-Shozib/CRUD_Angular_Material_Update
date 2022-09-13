import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductModel } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productItemChanged = new Subject<ProductModel[]>();
  onGoingDelete = false;
  constructor() {}

  public productItems: ProductModel[] = [
    new ProductModel(
      1,
      'Samsung',
      'Electronics',
      new Date(),
      'Brand New',
      24000,
      'Full Fresh'
    ),
    new ProductModel(
      2,
      'Nokia',
      'Electronics',
      new Date(),
      'Brand New',
      25000,
      'Good'
    ),
    new ProductModel(
      3,
      'Lg',
      'Electronics',
      new Date(),
      'Brand New',
      25000,
      'Good'
    ),
    new ProductModel(
      4,
      'Walton',
      'Electronics',
      new Date(),
      'Brand New',
      25000,
      'Good'
    ),
  ];

  getProductItems() {
    return this.productItems.slice();
  }
  addProductItem(item: ProductModel) {
    this.productItems.push(item);
    this.productItemChanged.next(this.productItems.slice());
  }
  upDateProductItem(id: number, upDateItem: ProductModel) {
    const index = this.productItems.findIndex((checkItem: ProductModel) => {
      return checkItem.id === id;
    });

    this.productItems[index] = upDateItem;
    this.productItemChanged.next(this.productItems.slice());
  }
  deleteProductItem(deleteId: number) {
    const deleteIndex = this.productItems.findIndex(
      (checkItem: ProductModel) => {
        return checkItem.id === deleteId;
      }
    );
    this.productItems.splice(deleteIndex, 1);
    this.productItemChanged.next(this.productItems.slice());
  }
  setProductDatas(productData: ProductModel[]) {
    if (productData && productData.length >= 1) {
      this.productItems = productData;
      this.productItemChanged.next(this.productItems.slice());
    } else {
      console.log(alert('No Data Found, Please Enter a Valid Data'));
    }
  }
}
