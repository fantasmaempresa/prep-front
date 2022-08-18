import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-militant-form',
  templateUrl: './militant-form.component.html',
  styleUrls: ['./militant-form.component.scss'],
})
export class MilitantFormComponent {
  militantForm = new FormGroup({
    //general info
    name: new FormControl('', [Validators.required]),
    last_name_p: new FormControl('', [Validators.required]),
    last_name_m: new FormControl('', [Validators.required]),
    curp: new FormControl('', [Validators.required]),
    //elector info
    ocr: new FormControl('', [Validators.required]),
    elector_key: new FormControl('', [Validators.required]),
    //contact info
    cell_phone: new FormControl('', [Validators.required]),
    house_phone: new FormControl('', []),
    email: new FormControl('', [Validators.required, Validators.email]),
    //admin data
    role: new FormControl('', [Validators.required]),
    assign_pattern: new FormControl('', [Validators.required]),
    //location data
    district: new FormControl('', [Validators.required]),
    municipaliy: new FormControl('', [Validators.required]),
    section: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });

  role_select = [
    {
      label: 'Operador',
      value: 1,
    },
    {
      label: 'Coornidaor de general',
      value: 2,
    },
    {
      label: 'Coornidaor de sección',
      value: 3,
    },
    {
      label: 'Militante',
      value: 4,
    },
  ];

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 19.043764,
    lng: -98.197851,
  };
  zoom = 15;
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng !== null) this.center = event.latLng.toJSON();
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng !== null) this.display = event.latLng.toJSON();
  }

  constructor(private router: Router, private route: ActivatedRoute) {}

  backToListRoles() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    console.log('se envia el formulario');
  }
}
