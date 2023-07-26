import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, MatSnackBarModule, MatDialogModule),
        { provide: MatDialogRef, useValue: null }, { provide: MAT_DIALOG_DATA, useValue: {} },
        provideAnimations()
    ]
})
  .catch(err => console.error(err));
