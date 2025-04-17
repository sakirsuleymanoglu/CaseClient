import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { BaseDialog } from '../base-dialog';
import { AccountService } from '../../../services/account/account.service';
import { DialogService } from '../../../services/dialog/dialog.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-create-account-dialog',
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './create-account-dialog.component.html',
  styleUrl: './create-account-dialog.component.css'
})
export class CreateAccountDialogComponent extends
  BaseDialog<CreateAccountDialogComponent, undefined> {

  private formBuilder = inject(FormBuilder);
  private accountService = inject(AccountService);
  private dialogService = inject(DialogService);

  createAccountForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
  })

  get title() {
    return this.createAccountForm.get('title');
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

  async onSubmit() {
    if (this.createAccountForm.valid) {
      this.dialogService.open({
        compononent: ConfirmDialogComponent,
        onAfterClosed: async (value: boolean | undefined) => {
          if (value) {
            await this.accountService.create({
              title: this.createAccountForm.value.title
            }, () => {
              this.dialogRef.close(true);
            })
          }
        }
      })
    }
  }
}
