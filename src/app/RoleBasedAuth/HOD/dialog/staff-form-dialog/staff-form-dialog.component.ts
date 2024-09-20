import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-staff-form-dialog',
  templateUrl: './staff-form-dialog.component.html',
  styleUrls: ['./staff-form-dialog.component.css']
})
export class StaffFormDialogComponent {
  staffForm: FormGroup;
  department = localStorage.getItem('userDepartment');

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StaffFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.staffForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      department: [this.department, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.staffForm.valid) {
      this.dialogRef.close(this.staffForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
