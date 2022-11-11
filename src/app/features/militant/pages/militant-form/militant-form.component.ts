import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionService } from '../../../../data/services/section.service';
import { MunicipalityService } from '../../../../data/services/municipality.service';
import { LocalDistrictService } from '../../../../data/services/local-district.service';
import { FederalDistrictService } from '../../../../data/services/federal-district.service';
import Swal from 'sweetalert2';
import { ValidatorEquals } from '../../../../shared/helpers/ValidatorsHelper';
import { MapsComponent } from '../../../../shared/components/maps/maps.component';
import { FederalDistrictDto } from '../../../../data/dto/FederalDistrict.dto';
import { MunicipalityDto } from '../../../../data/dto/Municipality.dto';
import { SectionDto } from '../../../../data/dto/Section.dto';
import { map, Observable, switchMap, tap } from 'rxjs';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  GeneralCoordinateType,
  OperatorType,
  Promoter,
  SectionCoordinateType,
} from '../../../../data/models/Promoter.model';
import { FormHandler, MessageHelper, Pagination } from 'o2c_core';
import { PromoterDto } from '../../../../data/dto/Promoter.dto';
import { PromoterService } from '../../../../data/services/promoter.service';
import { PeopleService } from '../../../../data/services/people.service';

@Component({
  selector: 'app-militant-form',
  templateUrl: './militant-form.component.html',
  styleUrls: ['./militant-form.component.scss'],
})
export class MilitantFormComponent implements AfterViewInit {
  formHandler!: FormHandler<PromoterDto, Pagination<PromoterDto>>;
  maps!: MapsComponent;
  showAssignPattern = true;
  districts$: Observable<FederalDistrictDto[]>;
  municipalities: MunicipalityDto[] = [];
  sections: SectionDto[] = [];
  CURP_REGEX =
    '[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}' +
    '(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])' +
    '[HM]{1}' +
    '(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)' +
    '[B-DF-HJ-NP-TV-Z]{3}' +
    '[0-9A-Z]{1}[0-9]{1}$';
  EK_REGEX = '[A-Z]{6}[0-9]{8}[A-Z]{1}[0-9]{3}';
  role_select = Promoter.ROL;
  pattern_select: { label: string; value: number }[] = [];
  militantForm = new FormGroup(
    {
      //general info
      name: new FormControl('', [Validators.required]),
      father_last_name: new FormControl('', [Validators.required]),
      mother_last_name: new FormControl('', [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      curp: new FormControl('', [
        Validators.required,
        Validators.pattern(this.CURP_REGEX),
      ]),
      curp_confirm: new FormControl('', [
        Validators.required,
        // Validators.pattern(this.CURP_REGEX),
      ]),
      //elector info
      ocr: new FormControl('', [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13),
      ]),
      ocr_confirm: new FormControl('', [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13),
      ]),
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
      address: new FormControl(''),
      address_lat: new FormControl(''),
      address_long: new FormControl(''),
      register_lat: new FormControl('0'),
      register_long: new FormControl('0'),
      promoter_id: new FormControl(null),
    },
    [
      ValidatorEquals('curp', 'curp_confirm', 'notEquals'),
      ValidatorEquals('elector_key', 'elector_key_confirm', 'notEquals'),
      ValidatorEquals('ocr', 'ocr_confirm', 'notEquals'),
    ]
  );
  optionsClass = {
    view: OperatorType,
    title: 'Operador',
  };
  private fieldsToValidate = [
    'cell_phone',
    'email',
    'curp',
    'curp_confirm',
    'ocr',
    'ocr_confirm',
    'elector_key',
    'elector_key_confirm',
    'promoter_id',
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private section: SectionService,
    private municipality: MunicipalityService,
    private localDistrict: LocalDistrictService,
    private federalDistrict: FederalDistrictService,
    private promoterService: PromoterService,
    private peopleService: PeopleService
  ) {
    this.districts$ = this.federalDistrict
      .fetchAll()
      .pipe(map(({ data }) => data));
    this.militantForm
      .get('district')
      ?.valueChanges.pipe(
        tap(() => Swal.showLoading(null)),
        switchMap((value) => this.federalDistrict.fetch(Number(value))),
        tap(() => Swal.close())
      )
      .subscribe({
        next: (response) => {
          this.municipalities = response.municipalities;
          this.sections = [];
        },
      });

    this.militantForm
      .get('municipality')
      ?.valueChanges.pipe(
        tap(() => Swal.showLoading(null)),
        switchMap((value) => this.municipality.fetch(Number(value))),
        tap(() => Swal.close())
      )
      .subscribe((response) => {
        this.sections = response.sections;
      });

    this.militantForm.get('assign_pattern')?.valueChanges.subscribe((value) => {
      const options = [
        {
          view: OperatorType,
          title: 'Operador',
        },
        {
          view: GeneralCoordinateType,
          title: 'Coordinador General',
        },
        {
          view: SectionCoordinateType,
          title: 'Coordinador de Sección',
        },
      ];
      if (value) {
        this.optionsClass = options[+value - 1];
      }
    });

    this.militantForm.get('type')?.valueChanges.subscribe((value) => {
      if (!value) return;
      this.pattern_select = [];

      const findRol = this.role_select.find((item) => +value === item.value);

      this.formHandler =
        +value !== 4
          ? new FormHandler(
              this.promoterService,
              this.route,
              this.router,
              this.militantForm,
              findRol?.label
            )
          : new FormHandler(
              this.peopleService,
              this.route,
              this.router,
              this.militantForm,
              findRol?.label
            );

      switch (+value) {
        case 1:
          this.showAssignPattern = false;
          this.militantForm.get('assign_pattern')?.clearValidators();
          this.militantForm.get('assign_pattern')?.updateValueAndValidity();
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
              label: 'Coordinador de general',
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
              label: 'Coordinador de general',
              value: 2,
            },
            {
              label: 'Coordinador de sección',
              value: 3,
            }
          );
          break;

        default:
          this.showAssignPattern = true;
      }
    });
  }

  @ViewChild(MapsComponent) set setMap(maps: MapsComponent) {
    this.maps = maps;
    setTimeout(() => {
      this.militantForm.setControl(
        'address',
        this.maps.form.get('address') as FormControl
      );
      this.militantForm.setControl(
        'address_lat',
        this.maps.form.get('lat') as FormControl
      );
      this.militantForm.setControl(
        'address_long',
        this.maps.form.get('lng') as FormControl
      );
      this.militantForm.get('address')?.addValidators(Validators.required);
      this.militantForm.get('address_lat')?.addValidators(Validators.required);
      this.militantForm.get('address_lng')?.addValidators(Validators.required);
      this.militantForm.get('address')?.updateValueAndValidity();
      this.militantForm.get('address_lat')?.updateValueAndValidity();
      this.militantForm.get('address_long')?.updateValueAndValidity();
    });
  }

  ngAfterViewInit(): void {
    this.maps.drawGeoJson('./../assets/geojson/mun.json');
  }

  removeValidatorsMilitant() {
    this.fieldsToValidate.forEach((field) => {
      this.militantForm.get(field)?.clearValidators();
      this.militantForm.get(field)?.updateValueAndValidity();
    });
  }

  setValidatorsMilitant() {
    this.fieldsToValidate.forEach((field) => {
      this.militantForm.get(field)?.addValidators(Validators.required);
      this.militantForm.get(field)?.updateValueAndValidity();
    });
  }

  async onSubmit() {
    if (this.militantForm.invalid) {
      const errors = Object.keys(this.militantForm.controls).map((key) => {
        return { key, error: this.militantForm.get(key)?.errors };
      });
      console.log(errors, this.militantForm.value);
      await MessageHelper.infoMessage('Válida tus campos por favor');
    }
    this.formHandler.currentAction();
  }
}
