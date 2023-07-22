import { CommonModule } from '@angular/common';
import { Component, Input, Signal } from '@angular/core';
import { BookList } from '../../types';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  standalone: true,
  imports: [CommonModule, MatSelectModule, ReactiveFormsModule, FormsModule]
})
export class ListsComponent {
  @Input({ required: true }) lists!: Signal<BookList[]>;
  selectedList: any = 'all';
  
  changeList(event: MatSelectChange) {
    console.log(event)
  }
}
