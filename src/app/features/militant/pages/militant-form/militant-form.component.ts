import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionService } from '../../../../data/services/section.service';
import { MunicipalityService } from '../../../../data/services/municipality.service';
import { LocalDistrictService } from '../../../../data/services/local-district.service';
import { FederalDistrictService } from '../../../../data/services/federal-district.service';
import Swal from 'sweetalert2';
import { ValidatorEquals } from '../../../../shared/helpers/ValidatorsHelper';
import { MapsComponent } from '../../../../shared/components/maps/maps.component';

@Component({
  selector: 'app-militant-form',
  templateUrl: './militant-form.component.html',
  styleUrls: ['./militant-form.component.scss'],
})
export class MilitantFormComponent implements AfterViewInit {
  @ViewChild(MapsComponent) public maps!: MapsComponent;
  showAssignPattern = true;
  districts = [];
  municipalities = [];
  sections = [];
  CURP_REGEX =
    '[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}' +
    '(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])' +
    '[HM]{1}' +
    '(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)' +
    '[B-DF-HJ-NP-TV-Z]{3}' +
    '[0-9A-Z]{1}[0-9]{1}$';
  EK_REGEX = '[A-Z]{6}[0-9]{8}[A-Z]{1}[0-9]{3}';

  role_select = [
    {
      label: 'Operador',
      value: 1,
    },
    {
      label: 'Coordinador de general',
      value: 2,
    },
    {
      label: 'Coordinador de sección',
      value: 3,
    },
    {
      label: 'Militante',
      value: 4,
    },
  ];

  pattern_select: { label: string; value: number }[] = [];
  militantForm = new FormGroup(
    {
      //general info
      name: new FormControl('', [Validators.required]),
      father_last_name: new FormControl('', [Validators.required]),
      mother_last_name: new FormControl('', [Validators.required]),
      curp: new FormControl('', [
        Validators.required,
        Validators.pattern(this.CURP_REGEX),
      ]),
      curp_confirm: new FormControl('', [
        Validators.required,
        // Validators.pattern(this.CURP_REGEX),
      ]),
      //elector info
      ocr: new FormControl('', [Validators.required]),
      ocr_confirm: new FormControl('', [Validators.required]),
      elector_key: new FormControl('', [
        Validators.required,
        Validators.pattern(this.EK_REGEX),
      ]),
      elector_key_confirm: new FormControl('', [
        Validators.required,
        Validators.pattern(this.EK_REGEX),
      ]),
      //contact info
      cell_phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
      ]),
      home_phone: new FormControl('', []),
      email: new FormControl('', [Validators.required, Validators.email]),
      //admin data
      type: new FormControl('', [Validators.required]),
      assign_pattern: new FormControl('', [Validators.required]),
      //location data
      district: new FormControl('', [Validators.required]),
      municipality: new FormControl('', [Validators.required]),
      section_id: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      lat: new FormControl('', [Validators.required]),
      lng: new FormControl('', [Validators.required]),
    },
    [
      ValidatorEquals('curp', 'curp_confirm', 'notEquals'),
      ValidatorEquals('elector_key', 'elector_key_confirm', 'notEquals'),
      ValidatorEquals('ocr', 'ocr_confirm', 'notEquals'),
    ]
  );

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
    });
    this.militantForm.get('district')?.valueChanges.subscribe((value) => {
      Swal.showLoading();
      this.federalDistrict.fetch(Number(value)).subscribe((response) => {
        // @ts-ignore
        this.municipalities = response.municipalities;
        this.sections = [];
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

    this.militantForm.get('type')?.valueChanges.subscribe((value) => {
      this.pattern_select = [];
      if (value === null) return;

      switch (+value) {
        case 1:
          this.showAssignPattern = false;
          this.setValidatorsMilitant();
          break;
        case 2:
          this.showAssignPattern = true;
          this.setValidatorsMilitant();
          this.pattern_select.push({
            label: 'Operador',
            value: 1,
          });
          break;

        case 3:
          this.showAssignPattern = true;
          this.setValidatorsMilitant();
          this.pattern_select.push(
            {
              label: 'Operador',
              value: 1,
            },
            {
              label: 'Coornidaor de general',
              value: 2,
            }
          );
          break;
        case 4:
          this.showAssignPattern = true;
          this.removeValidatorsMilitant();
          this.pattern_select.push(
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
            }
          );
          console.log('remove validators');

          break;

        default:
          this.showAssignPattern = true;
      }
    });
  }

  ngAfterViewInit(): void {
    this.maps.drawGeoJson('./../assets/geojson/mun.json');
  }

  removeValidatorsMilitant() {
    this.militantForm.get('cell_phone')?.clearValidators();
    this.militantForm.get('cell_phone')?.updateValueAndValidity();
    this.militantForm.get('email')?.clearValidators();
    this.militantForm.get('email')?.updateValueAndValidity();
    this.militantForm.get('curp')?.clearValidators();
    this.militantForm.get('curp')?.updateValueAndValidity();
    this.militantForm.get('curp_confirm')?.clearValidators();
    this.militantForm.get('curp_confirm')?.updateValueAndValidity();
    this.militantForm.get('ocr')?.clearValidators();
    this.militantForm.get('ocr')?.updateValueAndValidity();
    this.militantForm.get('ocr_confirm')?.clearValidators();
    this.militantForm.get('ocr_confirm')?.updateValueAndValidity();
    this.militantForm.get('elector_key')?.clearValidators();
    this.militantForm.get('elector_key')?.updateValueAndValidity();
    this.militantForm.get('elector_key_confirm')?.clearValidators();
    this.militantForm.get('elector_key_confirm')?.updateValueAndValidity();
  }

  setValidatorsMilitant() {
    this.militantForm.get('curp')?.addValidators([Validators.required]);
    this.militantForm.get('curp')?.updateValueAndValidity();
    this.militantForm.get('curp_confirm')?.addValidators([Validators.required]);
    this.militantForm.get('curp_confirm')?.updateValueAndValidity();
    this.militantForm.get('ocr')?.addValidators([Validators.required]);
    this.militantForm.get('ocr')?.updateValueAndValidity();
    this.militantForm.get('ocr_confirm')?.addValidators([Validators.required]);
    this.militantForm.get('ocr_confirm')?.updateValueAndValidity();
    this.militantForm.get('elector_key')?.addValidators([Validators.required]);
    this.militantForm.get('elector_key')?.updateValueAndValidity();
    this.militantForm
      .get('elector_key_confirm')
      ?.addValidators([Validators.required]);
    this.militantForm.get('elector_key_confirm')?.updateValueAndValidity();
  }

  backToListRoles() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    console.log('se envia el formulario', this.militantForm);
  }
}
