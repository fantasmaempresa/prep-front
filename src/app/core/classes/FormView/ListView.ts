import { EntityDto } from '../../../interfaces/Entity.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHelper } from '../../../shared/helpers/MessageHelper';
import { CrudService } from '../Crud/CrudService';
import { Action, Store } from '@ngrx/store';
import { Injector } from '@angular/core';
import { LOAD_ACTION } from '../../../shared/components/dinamyc-views/dynamic-views.module';
import { ActionsCard } from '../../../shared/components/dinamyc-views/card-view/card-view.component';

export class ListView<T extends EntityDto> {
  selectedItem!: T;

  protected router: Router;

  protected route: ActivatedRoute;

  private store: Store;

  private readonly loadAction: () => Action;

  actions: ActionsCard[] = [
    {
      icon: 'edit',
      callback: async (item: T) => {
        this.selectedItem = item;
        await this.goToEditForm();
      },
      tooltip: `Editar ${this.modelName}`,
    },
    {
      icon: 'delete',
      callback: (item: T) => {
        this.selectedItem = item;
        this.delete();
      },
      tooltip: `Eliminar ${this.modelName}`,
    },
  ];

  constructor(
    injector: Injector,
    protected service: CrudService<T>,
    protected modelName: string = 'Registro'
  ) {
    this.router = injector.get(Router);
    this.route = injector.get(ActivatedRoute);
    this.store = injector.get(Store);
    this.loadAction = injector.get(LOAD_ACTION);
  }

  setSelectedItem = (item: T) => {
    this.selectedItem = item;
  };

  goToEditForm = async () => {
    await this.router.navigate(['../', this.selectedItem.id], {
      relativeTo: this.route,
    });
  };

  goToAddForm = async () => {
    await this.router.navigate(['../new'], {
      relativeTo: this.route,
    });
  };

  delete = () => {
    MessageHelper.decisionMessage(
      `¿Deseas borrar el registro ${this.selectedItem.name}?`,
      'Una vez borrado no hay marcha atrás.',
      () => {
        this.service.delete(this.selectedItem.id).subscribe({
          next: () => this.store.dispatch(this.loadAction()),
        });
      }
    );
  };
}
