import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatDialogModule, CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule]
})
export class AddBookComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<AddBookComponent>);
  fb = inject(FormBuilder);

  title!: string;
  form!: FormGroup;
  formElements: any = [];

  constructor() {
    this.title = this.data.title;
    this.formElements = this.data.formElements;
    this.form = this.fb.group(this.data.form);
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.form.valid && this.dialogRef.close(this.form.value);
  }
}
