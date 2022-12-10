import { RechargeComponentService, ViewActions, viewActions, viewLabel } from "o2c_core";
import { UserService } from "../services/user.service";
import { MatDialog } from "@angular/material/dialog";
import { UserDto } from "../dto/User.dto";
import { UserFormComponent } from "../../features/users/pages/users-list/dialog/user-form/user-form.component";
import { MessageHelper } from "../../shared/helpers/MessageHelper";

const createDialog = new ViewActions<UserDto>(
  ({ row, injector }) => {
    const rechargeService = injector.get(RechargeComponentService);
    const dialog = injector.get(MatDialog);
    const dialogRef = dialog.open(UserFormComponent, {
      width: "500px",
      data: {
        edit: false
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        rechargeService.reloadPage();
      }
    });
  },
  "person_add",
  {
    tooltip: "Agregar usuario",
    color: "primary",
    isVisible: (row) => true
  }
);

const editDialog = new ViewActions<UserDto>(
  ({ row, injector }) => {
    const rechargeService = injector.get(RechargeComponentService);
    const dialog = injector.get(MatDialog);
    const dialogRef = dialog.open(UserFormComponent, {
      width: "500px",
      data: {
        user: row,
        edit: true
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        rechargeService.reloadPage();
      }
    });
  },
  "edit",
  {
    tooltip: "Agregar usuario",
    color: "primary",
    isVisible: (row) => !!row
  }
);

const deleteAction = new ViewActions<UserDto>(
  ({ row, injector }) => {
    const userService = injector.get(UserService);
    const rechargeService = injector.get(RechargeComponentService);
    MessageHelper.deleteMessage((row as UserDto).id, () => {
      userService.delete((row as UserDto).id).subscribe({
        next: () => {
          MessageHelper.successMessage("Éxito", "Usuario eliminado");
          rechargeService.reloadPage();
        }
      });
    })
  },
  "person_remove",
  {
    tooltip: "Eliminar usuario",
    color: "warn",
    isVisible: (row) => !!row
  }
);


@viewActions({
  classProvider: UserService,
  actions: [createDialog, editDialog, deleteAction]
})
export class User {
  id: number;
  @viewLabel("Nombre")
  name: string;
  @viewLabel("Correo")
  email: string;
  password?: string;

  constructor(id: number, email: string, name: string, password?: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
  }
}
