import { viewCrud, viewLabel } from "o2c_core";
import { ZoneService } from '../services/zone.service';

@viewCrud({
  classProvider: ZoneService,
  route: {
    add: '../new',
    edit: '../',
  },
  registerName: 'Zona',
})
export class Zone {
  id: number;
  @viewLabel('Nombre')
  name: string;
  @viewLabel('Descripción')
  description: string;
  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
