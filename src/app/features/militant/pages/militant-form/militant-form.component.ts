import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionService } from '../../../../data/services/section.service';
import { MunicipalityService } from '../../../../data/services/municipality.service';
import { LocalDistrictService } from '../../../../data/services/local-district.service';
import { FederalDistrictService } from '../../../../data/services/federal-district.service';
import Swal from 'sweetalert2';

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
    municipality: new FormControl('', [Validators.required]),
    section: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });

  districts = [];
  municipalities = [];
  sections = [];
  CURP_REGEX =
    '/^([A-Z][AEIOUX][A-Z]{2}\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\\d])(\\d)$/';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private section: SectionService,
    private municipality: MunicipalityService,
    private localDistrict: LocalDistrictService,
    private federalDistrict: FederalDistrictService
  ) {
    this.federalDistrict.fetchAll().subscribe((response) => {
      for (const element of response.data) {
        // @ts-ignore
        this.districts.push(element);
      }
      console.log(this.districts);
    });
    // this.localDistrict.fetchAll().subscribe((response) => {
    //   console.log(response);
    // });
    this.militantForm.get('district')?.valueChanges.subscribe((value) => {
      Swal.showLoading();
      this.federalDistrict.fetch(Number(value)).subscribe((response) => {
        // @ts-ignore
        this.municipalities = response.municipalities;
        Swal.close();
      });
    });

    this.militantForm.get('municipality')?.valueChanges.subscribe((value) => {
      Swal.showLoading();
      this.municipality.fetch(Number(value)).subscribe((response) => {
        // @ts-ignore
        this.sections = response.sections;
        Swal.close();
      });
    });
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng !== null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng !== null) this.display = event.latLng.toJSON();
  }

  backToListRoles() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    console.log('se envia el formulario');
  }
}
