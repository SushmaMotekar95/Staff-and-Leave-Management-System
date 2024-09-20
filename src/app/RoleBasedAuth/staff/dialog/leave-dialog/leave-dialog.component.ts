import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-leave-dialog',
  templateUrl: './leave-dialog.component.html',
  styleUrls: ['./leave-dialog.component.css']
})
export class LeaveDialogComponent {
  leaveForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LeaveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.leaveForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      reason: ['', Validators.required]
    });

    if (data) {
      this.leaveForm.patchValue(data);
    }
  }

  onSubmit() {
    if (this.leaveForm.valid) {
      this.dialogRef.close(this.leaveForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
