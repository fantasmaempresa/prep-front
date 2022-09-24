import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionService } from '../../../../data/services/section.service';
import { MunicipalityService } from '../../../../data/services/municipality.service';
import { LocalDistrictService } from '../../../../data/services/local-district.service';
import { FederalDistrictService } from '../../../../data/services/federal-district.service';
import Swal from 'sweetalert2';
import { ValidatorEquals } from '../../../../shared/helpers/ValidatorsHelper';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-militant-form',
  templateUrl: './militant-form.component.html',
  styleUrls: ['./militant-form.component.scss'],
})
export class MilitantFormComponent implements AfterViewInit {
  @ViewChild('mapSearch') searchElementRef!: ElementRef;
  @ViewChild(GoogleMap) public map!: GoogleMap;

  geocoder: google.maps.Geocoder;
  markers: google.maps.Marker[] = [];
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
  display: any;
  latitude = 19.043764;
  longitude = -98.197851;
  center: google.maps.LatLngLiteral = {
    lat: this.latitude,
    lng: this.longitude,
  };
  zoom = 15;

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
      house_phone: new FormControl('', []),
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
    this.geocoder = new google.maps.Geocoder();
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
    const searchBox = new google.maps.places.SearchBox(
      this.searchElementRef.nativeElement
    );

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (places?.length === 0) {
        return;
      }
      this.markers.forEach((marker) => {
        marker.setMap(null);
      });
      this.markers = [];

      const bounds = new google.maps.LatLngBounds();
      places?.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log('Returned place contains no geometry');
          return;
        }

        const icon = {
          url: place.icon as string,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        const marker = new google.maps.Marker({
          map: this.map.googleMap,
          icon: icon,
          animation: google.maps.Animation.DROP,
          title: place.name,
          position: place.geometry.location,
          draggable: true,
          clickable: true,
        });

        marker.addListener('dragend', () => {
          this.decoderPosition();
        });
        this.markers.push(marker);

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
    });
    console.log(searchBox);
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

  decoderPosition() {
    this.markers.forEach((marker) => {
      Swal.showLoading();
      this.geocoder
        .geocode({ location: marker.getPosition() })
        .then((response) => {
          if (response.results[0]) {
            console.log('geocoder ---> ', response.results[0]);
            this.militantForm
              .get('address')
              ?.setValue(response.results[0].formatted_address);
            const lat = marker.getPosition()?.lat().toString();
            const lng = marker.getPosition()?.lng().toString();
            if (lat && lng) {
              this.militantForm.get('lat')?.setValue(lat);
              this.militantForm.get('lng')?.setValue(lng);
            }

            Swal.close();
          }
        })
        .catch((e) => console.log('Geocoder failed due to: ' + e));
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
    console.log('se envia el formulario', this.militantForm);
  }
}
