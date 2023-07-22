import { Component, Input, Signal, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Book, TableConsts } from '../../types';
import { ActionButtonsComponent } from '../action-buttons/action-buttons.component';
import { BookService } from '../../services/book.service';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { Validators } from '@angular/forms';
import { AddBookComponent } from '../add-book/add-book.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  standalone: true,
  imports: [MatTableModule, CommonModule, ActionButtonsComponent, MatCardModule]
})
export class BooksListComponent {
  bookService = inject(BookService);
  utilitiesService = inject(UtilitiesService)

  @Input({ required: true }) books!: Signal<Book[]>;

  initColumns = [
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
          AddBookComponent
        );

        dialogRef.afterClosed().subscribe((res) => {
          res &&
            this.bookService.updateBook(res)
        });

        break;
      }
    }
  }

}