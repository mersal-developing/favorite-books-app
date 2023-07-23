import { Component, Input, Signal, inject, computed, ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Book, TableConsts } from '../../types';
import { ActionButtonsComponent } from '../action-buttons/action-buttons.component';
import { BookService } from '../../services/book.service';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { Validators } from '@angular/forms';
import { AddItemComponent } from '../../../shared/components/add-item/add-item.component';
import { MatCardModule } from '@angular/material/card';
import { BooksListService } from '../../services/books-list.service';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    ActionButtonsComponent,
    MatCardModule,
    DragDropModule,
    MatIconModule
  ]
})
export class BooksListComponent {
  @ViewChild('table') table!: MatTable<Book>;

  bookService = inject(BookService);
  listService = inject(BooksListService);
  utilitiesService = inject(UtilitiesService);
  dragDisabled = true;

  booksLists = computed(() => {
    return this.listService.favBooksList();
  });

  @Input({ required: true }) books!: Signal<Book[]>;

  initColumns = [
    {
      name: 'no',
      value: '',
    },
    {
      name: 'Book Title',
      value: 'title',
    },
    {
      name: 'Year',
      value: 'year',
    },
    {
      name: 'Author name',
      value: 'author_name',
    },
    {
      name: 'action',
      value: '',
    },

  ];

  formElements = [
    {
      name: 'title',
      placeHolder: 'Book Title',
    },
    {
      name: 'year',
      placeHolder: 'book publish year',
    },
    {
      name: 'author_name',
      placeHolder: 'author name',
    }
  ];

  displayedColumns: string[] = this.initColumns.map((col) => col.name);

  onTableAction(event: any) {
    switch (event.name) {
      case TableConsts.actionButton.delete: {
        this.bookService.deleteBook(event.value?.id);
        break;
      }

      case TableConsts.actionButton.edit: {
        const dialogRef = this.utilitiesService.openDialog(
          {
            title: 'Edit Book',
            form: {
              title: [event.value.title, Validators.required],
              author_name: [event.value.author_name, Validators.required],
              year: [event.value.year, Validators.required],
              id: [event.value.id, Validators.required],
            },
            formElements: [...this.formElements],
          },
          '',
          AddItemComponent
        );

        dialogRef.afterClosed().subscribe((res) => {
          res &&
            this.bookService.updateBook(res)
        });

        break;
      }

      case TableConsts.actionButton.addToList: {
        !!event.value.list.name && this.bookService.updateBook({ ...event.value.book, list: event.value.list.name });
        break;
      }

      case TableConsts.actionButton.removeFromList: {
        this.bookService.updateBook({ ...event.value.book, list: '' });
        break;
      }
    }
  }


  drop(event: CdkDragDrop<Book[]>) {
    const previousIndex = this.books().findIndex(row => row === event.item.data);
    moveItemInArray(this.books(), previousIndex, event.currentIndex);
    this.table.renderRows();

    this.bookService.favBooks.set(this.books());
    this.bookService.saveBooks();
  }

}
