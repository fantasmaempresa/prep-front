import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserDto } from "../../../../../../data/dto/User.dto";
import { UserService } from "../../../../../../data/services/user.service";
import { ValidatorEquals } from "../../../../../../shared/helpers/ValidatorsHelper";
import Swal from "sweetalert2";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MessageHelper } from "o2c_core";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"]
})
export class UserFormComponent implements OnInit {

  hidePassword = true;

  hideRepeatPassword = true;

  updatePassword = false;
  userForm = new FormGroup({
    id: new FormControl<number>(0, { nonNullable: true }),
    name: new FormControl("", { nonNullable: true }),
    email: new FormControl("", { nonNullable: true }),
    password: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    }),
    password_confirm: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    })
  }, [
    ValidatorEquals("password", "password_confirm", "notEqualsPassword")
  ]);

  constructor(
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      edit: boolean
      user: UserDto
    },
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    if (!this.data.edit) {
      this.updatePassword = true;
    }
    if (this.data.edit) {
      this.userForm.controls.password.setValidators([]);
      this.userForm.controls.password_confirm.setValidators([]);
      this.userForm.updateValueAndValidity();
    }
    if (this.data.user) {
      this.userForm.patchValue(this.data.user);
    }
  }

  submit() {
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) {
      return;
    }
    Swal.showLoading(null);
    if(this.data.edit) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    this.userService.save(this.userForm.getRawValue()).subscribe({
      next: () => {
        MessageHelper.successMessage("Éxito", 'Se guardó correctamente');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.log(err);
        MessageHelper.errorMessage('El servicio no se encuentra disponible en este momento, intente más tarde');
      }
    });
  }

  update() {
    const data = this.userForm.getRawValue();
    this.userService.update(data).subscribe(
      {
        next: () => {
          MessageHelper.successMessage("Éxito", 'Se guardó correctamente');
          this.dialogRef.close(true);
        },
        error: error => {
          console.log(error);
          MessageHelper.errorMessage('El servicio no se encuentra disponible en este momento, intente más tarde');
        }
      }
    );
  }

  updatePasswordChange(event: MatCheckboxChange) {
    this.updatePassword = event.checked;
    if (event.checked) {
      console.log("checked");
      this.userForm.controls.password.setValidators([Validators.required, Validators.minLength(6)]);
      this.userForm.controls.password.updateValueAndValidity();
      this.userForm.controls.password_confirm.setValidators([Validators.required, Validators.minLength(6)]);
      this.userForm.controls.password_confirm.updateValueAndValidity();
    } else {
      this.userForm.controls.password.setValidators([]);
      this.userForm.controls.password_confirm.setValidators([]);
      this.userForm.updateValueAndValidity();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
