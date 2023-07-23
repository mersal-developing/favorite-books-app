import { Injectable, computed, inject, signal } from '@angular/core';
import { BookList } from '../types';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class BooksListService {
  utilitiesService = inject(UtilitiesService);

  booksListJson = this.utilitiesService.getLocalStorageItem('books-list') as string;
  booksList = JSON.parse(this.booksListJson);
  favBooksList = this.booksList ? signal<BookList[]>(this.booksList) : signal<BookList[]>([]);

  saveLists = computed(() => {
    const booksList = this.favBooksList();
    this.utilitiesService.saveToLocalStorage('books-list', JSON.stringify(booksList));
  })

  addList(list: { name: string }) {
    const id = Math.random().toString(16);
    const newList = { name: list.name, id }; 
    this.favBooksList.update(lists => [...lists, newList]);
    this.saveLists();
    this.utilitiesService.openSnackBar('New List added successfully', 'ok', 'success-snackbar')
  }

  removeList(listId: string) {
    this.favBooksList.update(lists => (lists).filter((list) => list.id !== listId));
    this.saveLists();
    this.utilitiesService.openSnackBar(`List deleted succesfully`, 'ok', 'error-alert')
  }

}
