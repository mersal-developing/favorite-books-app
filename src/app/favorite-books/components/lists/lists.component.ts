import { CommonModule } from '@angular/common';
import { Component, EventEmitter,  Input, Output, Signal, inject } from '@angular/core';
import { BookList } from '../../types';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { BooksListService } from '../../services/books-list.service';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { MatDialogComponent } from 'src/app/shared/components/mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class ListsComponent {
  @Input({ required: true }) lists!: Signal<BookList[]>;

  @Output() listChange: EventEmitter<BookList> = new EventEmitter<BookList>();

  bookListService = inject(BooksListService);
  utilitiesService = inject(UtilitiesService);

  selectedList!: string;
  heading!: string;
  bookList!: string;

  dialogRef = inject(MatDialogRef<ListsComponent>);
  data = inject(MAT_DIALOG_DATA);

  changeList(event: MatSelectChange) {
    this.listChange.emit(event.value)
  }

  constructor() {
    this.lists = !!this.data.lists && this.data.lists;
    this.heading = !!this.data.heading && this.data.heading;
    this.bookList = !!this.data.list && this.data.list;
    this.selectedList = this.bookList ? this.bookList : 'all';
  }

  close() {
    this.dialogRef.close();
  }

  process(selectedList: any) {
    this.dialogRef.close(selectedList);
  }

  removeList(selectedList: any) {

    const dialogRef = this.utilitiesService.openDialog(
      { content: 'Are you sure you want to Delete?', heading: 'Delete' },
      'error-dialog',
      MatDialogComponent
    );

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res === 'yes') {
        this.bookListService.removeList(selectedList.id);
        this.listChange.emit(undefined);
        this.selectedList = 'all';
      }
    });
  }
}
