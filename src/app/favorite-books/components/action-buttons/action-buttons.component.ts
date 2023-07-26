import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Book, BookList, TableButtonAction, ActionButtons } from '../../types';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { MatDialogComponent } from 'src/app/shared/components/mat-dialog/mat-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { ListsComponent } from '../lists/lists.component';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatSelectModule]
})
export class ActionButtonsComponent {
  @Input() value!: Book;
  @Input() booksLists!: Signal<BookList[]>;

  @Output() buttonAction: EventEmitter<TableButtonAction> =
    new EventEmitter<TableButtonAction>();

  utilitiesService = inject(UtilitiesService);

  onAddListClick() {
    const bookList = this.booksLists().filter(bookList => bookList.name === this.value.list)[0]

    const dialogRef = this.utilitiesService.openDialog(
      { lists: this.booksLists, heading: "Add Book To list", list: bookList },
      'add-list-dialog',
      ListsComponent
    );

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res !== 'all') {
        this.buttonAction.emit({
          name: ActionButtons.addToList,
          value: { list: {...res}, book: this.value }
        });
      }
    })

  }

  onDeleteClick() {
    const dialogRef = this.utilitiesService.openDialog(
      { content: 'Are you sure you want to Delete?', heading: 'Delete' },
      'error-dialog',
      MatDialogComponent
    );

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res === 'yes') {
        this.buttonAction.emit({
          name: ActionButtons.delete,
          value: this.value,
        });
      }
    });
  }

  onEditClick() {

    this.buttonAction.emit({
      name: ActionButtons.edit,
      value: this.value,
    });
  }

  removeFromList() {
    this.buttonAction.emit({
      name: ActionButtons.removeFromList,
      value: { list: '', book: this.value },
    });
  }
}
