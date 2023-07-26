import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss'],
  standalone: true,
  imports: [MatButtonModule]
})
export class MatDialogComponent {
  content!: string;
  heading!: string;

  dialogRef = inject(MatDialogRef<MatDialogComponent>);
  data = inject(MAT_DIALOG_DATA);

  constructor(
  ) {
    this.content = this.data?.content;
    this.heading = this.data?.heading;
  }

  close() {
    this.dialogRef.close();
  }

  process() {
    this.dialogRef.close("yes");
  }
}
