import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Book, TableButtonAction, TableConsts } from '../../types';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { MatDialogComponent } from 'src/app/shared/components/mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule]
})
export class ActionButtonsComponent {
  @Input() value!: Book;
  @Input() isAddButton = false;

  @Output() buttonAction: EventEmitter<TableButtonAction> =
    new EventEmitter<TableButtonAction>();

  utilitiesService = inject(UtilitiesService);

  onAddClick() {

    this.buttonAction.emit({
      name: TableConsts.actionButton.add,
    });
  }

  onDeleteClick() {
    const dialogRef = this.utilitiesService.openDialog(
      { content: 'Are you sure you want to Delete?', heading: 'Delete' },
      'error-dialog',
      MatDialogComponent
    );

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res === 'yes') {
        this.buttonAction.emit({
          name: TableConsts.actionButton.delete,
          value: this.value,
        });
      }
    });
  }

  onEditClick() {

    this.buttonAction.emit({
      name: TableConsts.actionButton.edit,
      value: this.value,
    });
  }
}
