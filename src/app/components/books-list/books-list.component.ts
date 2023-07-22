import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Book } from 'src/app/types/types';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTableModule],
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent {
  title = 'My Favorite Books App';
  displayedColumns: string[] = ['Book Title', 'Year', 'Author name'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: Book[] = [];




}
