import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";

export const AppConfig:ApplicationConfig  =  {
    providers: [
        importProvidersFrom(BrowserModule, MatSnackBarModule, MatDialogModule),
        { provide: MatDialogRef, useValue: null }, { provide: MAT_DIALOG_DATA, useValue: {} },
        provideAnimations()
    ]
}