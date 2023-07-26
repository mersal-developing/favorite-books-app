import { Component } from '@angular/core';
import { FavoriteBooksComponent } from './favorite-books/favorite-books.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [FavoriteBooksComponent]
})
export class AppComponent {
}
