import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataStorageService } from '../data-storage.service';
import { ProductModel } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  productCategory: string[] = ['Electronics', 'Clothings', 'Food'];
  qualities: string[] = ['Brand New', 'Second Hand', 'Refubrished'];
  editMode = false;

  productForm!: FormGroup;

  constructor(
    private productService: ProductService,
    
    @Inject(MAT_DIALOG_DATA) public passedData: ProductModel,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    if (this.passedData) {
      this.editMode = true;
      this.editForm(this.passedData);
    } else {
      this.initForm();
    }
  }

  initForm() {
    this.productForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      quality: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      comment: new FormControl(null, Validators.required),
    });
  }

  editForm(passedData: ProductModel) {
    this.productForm = new FormGroup({
      id: new FormControl(passedData.id, Validators.required),
      name: new FormControl(passedData.name, Validators.required),
      category: new FormControl(passedData.category, Validators.required),
      date: new FormControl(passedData.date, Validators.required),
      quality: new FormControl(passedData.quality, Validators.required),
      price: new FormControl(passedData.price, Validators.required),
      comment: new FormControl(passedData.comment, Validators.required),
    });
  }

  onAddProduct() {
    if (this.editMode) {
      this.productService.upDateProductItem(
        this.passedData.id,
        this.productForm.value
      );
    } else {
      this.productService.addProductItem(this.productForm.value);
    }
    this.editMode = false;
    this.productForm.reset();
    this.dataStorageService.storeData();
  }
}
