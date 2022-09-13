import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'CRUD_Angular_Material';
  constructor(private dialog: MatDialog) {}
  openDialog() {
    this.dialog.open(ModalComponent, {
      width: '40%',
    });
  }
}
