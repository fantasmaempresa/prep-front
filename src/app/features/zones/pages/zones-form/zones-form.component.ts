import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map, Observable, startWith, switchMap, tap } from 'rxjs';
import { FederalDistrictDto } from '../../../../data/dto/FederalDistrict.dto';
import { FederalDistrictService } from '../../../../data/services/federal-district.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MunicipalityDto } from '../../../../data/dto/Municipality.dto';
import { SectionDto } from '../../../../data/dto/Section.dto';
import { MunicipalityService } from '../../../../data/services/municipality.service';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { ZoneService } from '../../../../data/services/zone.service';
import { ZoneDto } from '../../../../data/dto/Zone.dto';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';

@Component({
  selector: 'app-zones-form',
  templateUrl: './zones-form.component.html',
  styleUrls: ['./zones-form.component.scss'],
})
export class ZonesFormComponent implements OnInit {
  @ViewChild('sectionInput') sectionInput!: ElementRef;

  districts$: Observable<FederalDistrictDto[]> = this.federalDistrict
    .fetchAll()
    .pipe(map(({ data }) => data));

  zoneForm = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  districtControl = new FormControl();

  municipalityControl = new FormControl();

  sectionControl = new FormControl();

  filteredSections!: Observable<SectionDto[]>;

  selectedSections: SectionDto[] = [];

  municipalities: MunicipalityDto[] = [];

  sections: SectionDto[] = [];

  hoverIndex: any;

  constructor(
    private federalDistrict: FederalDistrictService,
    private municipality: MunicipalityService,
    private zoneService: ZoneService
  ) {}

  ngOnInit(): void {
    this.districtControl.valueChanges
      .pipe(
        tap(() => Swal.showLoading(null)),
        switchMap((value) => this.federalDistrict.fetch(Number(value))),
        tap(() => Swal.close())
      )
      .subscribe({
        next: (response) => {
          this.municipalities = response.municipalities;
          this.sections = [];
          this.selectedSections = [];
        },
      });

    this.municipalityControl.valueChanges
      .pipe(
        tap(() => Swal.showLoading(null)),
        switchMap((value) => this.municipality.fetch(Number(value))),
        tap(() => Swal.close())
      )
      .subscribe((response) => {
        this.sections = response.sections;
        this.selectedSections = [];
        this.filteredSections = this.sectionControl.valueChanges.pipe(
          startWith(null),
          map((value) => {
            console.log(value);
            const name = typeof value === 'string' ? value : value?.section;
            return name ? this._filter(name as string) : this.sections.slice();
          })
        );
      });
  }

  updateList(event: MatAutocompleteSelectedEvent) {
    const value = event.option.value;
    const checkSection = (obj: SectionDto) => obj.id === value.id;

    if (this.selectedSections.some(checkSection)) {
      this.sectionControl.setValue('');
      this.sectionInput.nativeElement.blur();
      return;
    }

    this.selectedSections.push(value);
    this.sectionControl.reset();
    this.sectionInput.nativeElement.blur();
    setTimeout(() => {
      this.sectionInput.nativeElement.focus();
    }, 100);
    console.log(event);
  }

  enter(index: number) {
    this.hoverIndex = index;
  }

  leave() {
    this.hoverIndex = null;
  }

  removeSectionFromZone(section: SectionDto) {
    console.log(section);
    this.selectedSections = this.selectedSections.filter(
      (value) => value.id !== section.id
    );
  }

  displayFn(section: SectionDto): string {
    return section && section.section ? section.section : '';
  }

  private _filter(name: string): SectionDto[] {
    console.log(name);
    const filterValue = name;

    return this.sections.filter((section) =>
      section.section.includes(filterValue)
    );
  }

  saveZone() {
    const form = this.zoneForm.getRawValue();
    const payload: ZoneDto = {
      name: form.name,
      description: form.description,
      sections: this.selectedSections,
      id: 0,
    };

    this.zoneService.save(payload).subscribe({
      next: (response) => {
        MessageHelper.successMessage('Éxito', 'Zona guardada con éxito');
        this.zoneForm.reset();
      },
      error: (error) => {
        MessageHelper.errorMessage(
          'Ha ocurrido un error al guardar la zona, intentelo mas tarde'
        );
      },
    });
  }
}
