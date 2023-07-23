import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  private _snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  openSnackBar(message: string, action: string, panelClass?: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2000,
      panelClass
    });
  }


  openDialog(data: any, panelClass?: string, MatDialogComponent?: any) {
    const dialogRef = this.dialog.open(MatDialogComponent, {
      width: '300px',
      data,
      panelClass
    })

    return dialogRef
  }
}
