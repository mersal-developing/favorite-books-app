import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookService } from './services/book.service';
import { UtilitiesService } from '../shared/services/utilities.service';
import { AddItemComponent } from '../shared/components/add-item/add-item.component';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { BooksListService } from './services/books-list.service';
import { ListsComponent } from './components/lists/lists.component';
import { BookList } from './types';

@Component({
  selector: 'app-favorite-books',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    BooksListComponent,
    ListsComponent
  ],
  templateUrl: './favorite-books.component.html',
  styleUrls: ['./favorite-books.component.scss']
})
export class FavoriteBooksComponent {
  title = 'My Favorite Books App';

  utilitiesService = inject(UtilitiesService);
  booksService = inject(BookService);
  booksListService = inject(BooksListService);

  listFilter = signal<string>('');

  listName = computed(() => this.listFilter())

  books = computed(() => {
    let books;
    console.log(this.listName())

    if (this.listName()) {
      books = this.booksService.getListBooks(this.listName())
    } else {
      books = this.booksService.favBooks();
    }

    return books;
  })

  lists = computed(() => {
    const booksLists = this.booksListService.favBooksList();
    return booksLists;
  })

  bookFormElements = [
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

  listFormElements = [
    {
      name: 'name',
      placeHolder: 'List Name',
    },

  ];

  addBook() {
    const dialogRef = this.utilitiesService.openDialog({
      title: 'Add New Book',

      formElements: this.bookFormElements,
      form: {
        title: ['', Validators.required],
        year: [undefined, Validators.compose(
          [Validators.required, this.numberValidator, Validators.minLength(4), Validators.maxLength(4)]
        )],
        author_name: ['', Validators.required]
      },
    }, '', AddItemComponent);

    dialogRef.afterClosed().subscribe((res) => {
      res &&
        this.booksService.addBook(res);

    });
  }

  numberValidator(control: AbstractControl): ValidationErrors | null {
    const inputValue = control.value;
    if (isNaN(inputValue)) {
      return { notANumber: true };
    }
    return null;
  }

  addList() {
    const dialogRef = this.utilitiesService.openDialog({
      title: 'Add New List',

      formElements: this.listFormElements,
      form: {
        name: ['', Validators.required],

      },
    }, '', AddItemComponent);

    dialogRef.afterClosed().subscribe((res) => {
      res &&
        this.booksListService.addList(res);

    });
  }

  filterBook(event: BookList) {
    if(event) this.listFilter.set(event.name);
    else this.listFilter.set('')
  }


}
