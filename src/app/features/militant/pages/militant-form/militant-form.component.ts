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
  ActivistType,
  AreaManagerType,
  DistrictCoordinatorType,
  Promoter,
  SectionManagerType,
} from '../../../../data/models/Promoter.model';
import { FormHandler, MessageHelper, Pagination } from 'o2c_core';
import { PromoterDto } from '../../../../data/dto/Promoter.dto';
import { PromoterService } from '../../../../data/services/promoter.service';
import { PeopleService } from '../../../../data/services/people.service';
import { ZoneService } from "../../../../data/services/zone.service";
import { ZoneDto } from "../../../../data/dto/Zone.dto";

@Component({
  selector: 'app-militant-form',
  templateUrl: './militant-form.component.html',
  styleUrls: ['./militant-form.component.scss'],
})
export class MilitantFormComponent implements AfterViewInit {
  isDistrictCoordinator = false;
  isAreaManager = false;
  isSectionManager = false;
  isActivist = false;
  isSympathizer = false;

  formHandler!: FormHandler<PromoterDto, Pagination<PromoterDto>>;
  maps!: MapsComponent;
  showAssignPattern = true;
  districts$: Observable<FederalDistrictDto[]>;
  zones$: Observable<ZoneDto[]> = this.zoneService
    .fetchAll()
    .pipe(map(({ data }) => data));
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
      home_phone: new FormControl(null, []),
      email: new FormControl('', [Validators.required, Validators.email]),
      //admin data
      type: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      //location data
      district: new FormControl(''),
      municipality: new FormControl(''),
      section_id: new FormControl(''),
      zone_id: new FormControl(''),
      address: new FormControl(''),
      lat: new FormControl(''),
      lng: new FormControl(''),
      local_district_id: new FormControl(null),
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
  optionsClass: any = null;
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
    private peopleService: PeopleService,
    private zoneService: ZoneService
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
          view: DistrictCoordinatorType,
          title: 'Operador',
        },
        {
          view: AreaManagerType,
          title: 'Coordinador General',
        },
        {
          view: SectionManagerType,
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

      const options = [
        {
          view: DistrictCoordinatorType,
          title: 'Coordinador distrital',
        },
        {
          view: AreaManagerType,
          title: 'Responsable de zona',
        },
        {
          view: SectionManagerType,
          title: 'Responsable de sección',
        },
        {
          view: ActivistType,
          title: 'Activista',
        },
      ];

      this.formHandler =
        +value !== 5
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
          this.optionsClass = null;
          break;

        case 2:
          this.optionsClass = options[0];
          break;

        case 3:
          this.optionsClass = options[1];
          break;

        case 4:
          this.optionsClass = options[2];
          break;

        case 5:
          this.optionsClass = options[3];
          break;

        default:
          this.optionsClass = null;
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
        'lat',
        this.maps.form.get('lat') as FormControl
      );
      this.militantForm.setControl(
        'lng',
        this.maps.form.get('lng') as FormControl
      );
      this.militantForm.get('address')?.addValidators(Validators.required);
      this.militantForm.get('lat')?.addValidators(Validators.required);
      this.militantForm.get('lng')?.addValidators(Validators.required);
      this.militantForm.get('address')?.updateValueAndValidity();
      this.militantForm.get('lat')?.updateValueAndValidity();
      this.militantForm.get('lng')?.updateValueAndValidity();
    });
  }

  ngAfterViewInit(): void {
    this.maps.setCenterMap(18.07918, -93.235782, 8);
    this.maps.drawGeoJson('./../assets/geojson/tabasco_municipalities.json');
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
