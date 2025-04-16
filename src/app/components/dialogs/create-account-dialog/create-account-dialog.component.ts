import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { HttpClientService } from '../../../services/http-client/http-client.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { API_BASE_URL } from '../../../app.config';
import { lastValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BaseDialog } from '../base-dialog';

@Component({
  selector: 'app-create-account-dialog',
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './create-account-dialog.component.html',
  styleUrl: './create-account-dialog.component.css'
})
export class CreateAccountDialogComponent extends
  BaseDialog<CreateAccountDialogComponent, string> {
  constructor(@Inject(API_BASE_URL) private baseUrl: string) {
    super();
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

  private formBuilder = inject(FormBuilder);
  private httpClientService = inject(HttpClientService);
  private spinnerService = inject(NgxSpinnerService);
  private toastrService = inject(ToastrService);

  createAccountForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
  })

  get title() {
    return this.createAccountForm.get('title');
  }

  async submitLoginForm() {
    if (this.createAccountForm.valid) {
      this.spinnerService.show();
      lastValueFrom(this.httpClientService.post({
        baseUrl: this.baseUrl,
        path: "accounts"
      }, {
        appUserId: this.data,
        title: this.createAccountForm.value.title,
      })).then((_) => {
        this.dialogRef.close(true);
        this.toastrService.success("Hesap oluşturuldu");
      }).finally(() => {
        this.spinnerService.hide();
      })
    }
  }
}
