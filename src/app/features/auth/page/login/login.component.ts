import { Component, HostBinding } from '@angular/core';
import { FormValidationService } from '../../../../shared/services/form-validation.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { validationMessages } from '../../../../core/constants/validationMessages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @HostBinding('class') classes = 'flex-fill justify-content-center row';

  constructor(
    private formValidationService: FormValidationService,
    private router: Router
  ) {}

  signUpForm!: FormGroup;

  hidePassword = true;

  isLoading$!: Observable<boolean>;

  formErrors: any = {};

  errorMessage$!: Observable<string | null>;

  ngOnInit(): void {
    this.signUpForm = new FormGroup(
      {
        username: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
      }
      // {
      //   validators: this.formValidationService.matchConfirmItems('password', 'confirmPassword')
      // }
    );

    this.signUpForm.valueChanges.subscribe(() => {
      this.logValidationErrors();
    });
  }

  logValidationErrors() {
    this.formErrors = this.formValidationService.getValidationErrors(
      this.signUpForm,
      validationMessages
    );
  }

  onSubmit() {
    this.signUpForm.markAllAsTouched();
    this.logValidationErrors();
    const username = this.signUpForm.value.username;
    const password = this.signUpForm.value.password;
  }
}
