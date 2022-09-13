import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { DataStorageService } from '../data-storage.service';
import { ModalComponent } from '../modal/modal.component';
import { ProductModel } from '../product.model';
import { ProductService } from '../product.service';
import { WarningComponent } from '../warning/warning.component';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css'],
})
export class FrontpageComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //productItems!: ProductModel[];

  displayedColumns: string[] = [
    'id',
    'name',
    'category',
    'date',
    'quality',
    'price',
    'comment',
    'action',
  ];

  dataSource = new MatTableDataSource<ProductModel>();
  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.dataSource.data = this.productService.getProductItems();
    this.productService.productItemChanged.subscribe((item) => {
      this.dataSource.data = item;
    });
    this.onFetchData();
  }
  onFetchData() {
    this.dataStorageService.fetchData().subscribe();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  onEditItem(row: ProductModel) {
    this.dialog.open(ModalComponent, {
      width: '40%',
      data: row,
    });
  }
  onDeleteItem(id: number) {
    const dialogRef = this.dialog.open(WarningComponent, {
      width: '30%',
      data: id,
    });
    dialogRef.afterClosed().subscribe((result) => {
      //console.log(result);
      if (result) {
        this.productService.deleteProductItem(id);
      }
    });
    this.dataStorageService.storeData();
  }
}
