import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookService } from './services/book.service';
import { UtilitiesService } from '../shared/services/utilities.service';
import { AddBookComponent } from './components/add-book/add-book.component';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-favorite-books',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, BooksListComponent],
  templateUrl: './favorite-books.component.html',
  styleUrls: ['./favorite-books.component.scss']
})
export class FavoriteBooksComponent {
  title = 'My Favorite Books App';

  booksService = inject(BookService);
  utilitiesService = inject(UtilitiesService);

  data = computed(() => {
    const books = this.booksService.favBooks();
    return books;
  })

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

  addBook() {
    const dialogRef = this.utilitiesService.openDialog({
      title: 'Add New Book',

      formElements: this.formElements,
      form: {
        title: ['', Validators.required],
        year: [undefined, Validators.compose(
          [Validators.required, this.numberValidator, Validators.minLength(4), Validators.maxLength(4)]
        )],
        author_name: ['', Validators.required]
      },
    }, '', AddBookComponent);

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

  addList() { }


}
