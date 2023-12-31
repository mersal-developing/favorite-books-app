import { Injectable, computed, inject, signal } from '@angular/core';
import { Book } from '../types';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  utilitiesService = inject(UtilitiesService);

  booksJson = this.utilitiesService.getLocalStorageItem('books') as string;
  books = JSON.parse(this.booksJson);
  favBooks = this.books ? signal<Book[]>(this.books) : signal<Book[]>([]);

  saveBooks = computed(() => {
    const books = this.favBooks();
    this.utilitiesService.saveToLocalStorage('books', JSON.stringify(books));
  })

  addBook(book: Book): void {
    const id = Math.random().toString(16);
    book.id = id;
    book.list = '';
    this.favBooks.update(books => [...books, book]);
    this.saveBooks();
    this.utilitiesService.openSnackBar('New Book added successfully', 'ok', 'success-snackbar')
  }

  updateBook(bookToUpdate: Book) {
    const indexToUpdate = this.favBooks().findIndex((book) => book.id === bookToUpdate.id);
    this.favBooks()[indexToUpdate] = bookToUpdate;

    this.favBooks.update(books => [...books]);
    this.saveBooks();
    this.utilitiesService.openSnackBar(`Book ${bookToUpdate.title} updated succesfully`, 'ok', 'success-snackbar')

  }

  deleteBook(id: string): void {
    this.favBooks.update(books => (books).filter((book) => book.id !== id));
    this.saveBooks();
    this.utilitiesService.openSnackBar(`Book deleted succesfully`, 'ok', 'error-alert')
  }

  getListBooks(listName: string) {
   return  this.favBooks().filter(book => book.list === listName)
  }

}
