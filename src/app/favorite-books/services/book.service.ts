import { Injectable, signal } from '@angular/core';
import { Book } from '../types';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  favBooks = signal<Book[]>([]);

  addBook(book: Book): void {
    const id = Math.random().toString(16);
    book.id = id;

    this.favBooks.update(books => [...books, book]);
  }

  updateBook(bookToUpdate: Book) {
    const indexToUpdate = this.favBooks().findIndex((book) => book.id === bookToUpdate.id);
    this.favBooks()[indexToUpdate] = bookToUpdate;
    
    this.favBooks.update(books => [...books])
  }

  deleteBook(id: string): void {
    this.favBooks.update(books => (books).filter((book) => book.id !== id));
  }
}
