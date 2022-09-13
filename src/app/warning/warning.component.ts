import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css'],
})
export class WarningComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataId: number,
   
  ) {}

  ngOnInit(): void {}
}
