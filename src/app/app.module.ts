import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FavoriteBooksComponent } from './favorite-books/favorite-books.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogComponent } from './shared/components/mat-dialog/mat-dialog.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FavoriteBooksComponent,
    MatSnackBarModule,
    MatDialogModule,
    MatDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
