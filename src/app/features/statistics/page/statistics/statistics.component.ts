import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { MunicipalityDto } from '../../../../data/dto/Municipality.dto';
import { MunicipalityService } from '../../../../data/services/municipality.service';
import { FormControl } from '@angular/forms';
import { ChartsService } from '../../../../data/services/charts.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { MapsComponent } from '../../../../shared/components/maps/maps.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, AfterViewInit {
  @ViewChild(MapsComponent) maps!: MapsComponent;

  animations: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Year';

  colorScheme: Color = {
    domain: ['#2b2b2b', '#e6ddda'],
    name: 'cool',
    group: ScaleType.Linear,
    selectable: true,
  };

  municipalities$: Observable<MunicipalityDto[]> = this.municipalityService
    .fetchAll()
    .pipe(map((data) => data.data));

  municipalityControl = new FormControl();
  optionControl = new FormControl();

  statistics$ = this.municipalityControl.valueChanges.pipe(
    switchMap((municipalityId) =>
      this.chartService.byMunicipality(municipalityId)
    ),
    map((value: any) => {
      const first = value.statistics[0].data.shift();
      return value.statistics[0];
    })
  );

  population = this.municipalityControl.valueChanges.pipe(
    switchMap((municipalityId) =>
      this.chartService.byMunicipality(municipalityId)
    ),
    map((value: any) => value.statistics[0].data.shift())
  );

  statisticsByOption: any;

  percentage: any[] = [];

  people: any[] = [];

  deficiencies: any[] = [];

  constructor(
    private municipalityService: MunicipalityService,
    private chartService: ChartsService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (environment.location === 'PUEBLA') {
      this.maps.drawGeoJson('./../assets/geojson/mun.json');
      this.maps.setCenterMap(19.045854, -98.206094, 8);
    } else if (environment.location === 'TABASCO') {
      this.maps.drawGeoJson('./../assets/geojson/tabasco_municipalities.json');
      this.maps.setCenterMap(18.07918, -93.235782, 8);
    }
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.municipalityControl.valueChanges.subscribe((municipalityId) => {
      switch (municipalityId) {
        case 1:
          this.maps.drawMarkers([
            {
              lat: 19.103333333333,
              lng: -97.951111111111,
              label: 'Acajete',
              draggable: false,
              icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            },
          ]);
          this.maps.setCenterMap(19.103333333333, -97.951111111111, 10);
          break;
        case 2:
          this.maps.drawMarkers([
            {
              lat: 20.1299,
              lng: -97.2085,
              label: 'Acateno',
              draggable: false,
              icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            },
          ]);
          this.maps.setCenterMap(20.1299, -97.2085, 10);
          break;
        case 3:
          this.maps.drawMarkers([
            {
              lat: 18.213183,
              lng: -98.055495,
              label: 'Acatlan',
              draggable: false,
              icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            },
          ]);
          this.maps.setCenterMap(18.213183, -98.055495, 10);
          break;
        case 4:
          this.maps.drawMarkers([
            {
              lat: 18.98315,
              lng: -97.782925,
              label: 'Acatzingo',
              draggable: false,
              icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            },
          ]);
          this.maps.setCenterMap(18.98315, -97.782925, 10);
          break;
        case 5:
          this.maps.drawMarkers([
            {
              lat: 18.263095,
              lng: -93.222594,
              label: 'Comalcalco',
              draggable: false,
              icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            },
          ]);
          this.maps.setCenterMap(18.263095, -93.222594, 10);
          break;
        case 6:
          this.maps.drawMarkers([
            {
              lat: 18.070284,
              lng: -93.168859,
              label: 'Cunduacán',
              draggable: false,
              icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            },
          ]);
          this.maps.setCenterMap(18.070284, -93.168859, 10);
          break;
        case 7:
          this.maps.drawMarkers([
            {
              lat: 17.736268,
              lng: -91.7777,
              label: 'Emiliano Zapata',
              draggable: false,
              icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            },
          ]);
          this.maps.setCenterMap(17.736268, -91.7777, 10);
          break;
        case 8:
          this.maps.drawMarkers([
            {
              lat: 17.830387,
              lng: -93.389456,
              label: 'Huimanguillo',
              draggable: false,
              icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            },
          ]);
          this.maps.setCenterMap(17.830387, -93.389456, 10);
          break;
        case 9:
          this.maps.drawMarkers([
            {
              lat: 17.72312,
              lng: -92.81199,
              label: 'Jalapa',
              draggable: false,
              icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            },
          ]);
          this.maps.setCenterMap(17.72312, -92.81199, 10);
          break;
        case 10:
          this.maps.drawMarkers([
            {
              lat: 18.165677,
              lng: -93.064343,
              label: 'Jalpa de Méndez',
              draggable: false,
              icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            },
          ]);
          this.maps.setCenterMap(18.165677, -93.064343, 10);
          break;
        case 11:
          this.maps.drawMarkers([
            {
              lat: 18.047531,
              lng: -92.174747,
              label: 'Jonuta',
              draggable: false,
              icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            },
          ]);
          this.maps.setCenterMap(18.047531, -92.174747, 10);
          break;
        case 12:
          this.maps.drawMarkers([
            {
              lat: 17.76185,
              lng: -92.59563,
              label: 'Macuspana',
              draggable: false,
              icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            },
          ]);
          this.maps.setCenterMap(17.76185, -92.59563, 10);
          break;
        case 13:
          this.maps.drawMarkers([
            {
              lat: 18.173025,
              lng: -93.015087,
              label: 'Nacajuca',
              draggable: false,
              icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            },
          ]);
          this.maps.setCenterMap(18.173025, -93.015087, 11);
          break;
        case 14:
          this.maps.drawMarkers([
            {
              lat: 18.404687,
              lng: -93.211165,
              label: 'Paraíso',
              draggable: false,
              icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            },
          ]);
          this.maps.setCenterMap(18.404687, -93.211165, 10);
          break;
        case 15:
          this.maps.drawMarkers([
            {
              lat: 17.595723,
              lng: -92.826401,
              label: 'Tacotalpa',
              draggable: false,
              icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            },
          ]);
          this.maps.setCenterMap(17.595723, -92.826401, 10);
          break;
        case 16:
          this.maps.drawMarkers([
            {
              lat: 17.559681,
              lng: -92.947044,
              label: 'Teapa',
              draggable: false,
              icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            },
          ]);
          this.maps.setCenterMap(17.559681, -92.947044, 10);
          break;
        case 17:
          this.maps.drawMarkers([
            {
              lat: 17.467988,
              lng: -91.420368,
              label: 'Tenosique',
              draggable: false,
              icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            },
          ]);
          this.maps.setCenterMap(17.467988, -91.420368, 10);
          break;
      }
      this.percentage = [];
      this.people = [];
      this.deficiencies = [];
      this.statisticsByOption = null;
    });

    this.optionControl.valueChanges.subscribe(({ data }) => {
      this.percentage = data.slice(0, 3).map((item: any) => {
        return {
          name: this.removeFromString(['Porcentaje'], item.name),
          value: item.value,
        };
      });
      this.people = data.slice(3, 6).map((item: any) => {
        const cleanNum = item.value.replace(',', '');
        return {
          name: this.removeFromString(['Personas', 'de'], item.name),
          value: parseFloat(cleanNum),
        };
      });
      this.deficiencies = data.slice(6).map((item: any) => {
        return {
          ...item,
          name: this.removeFromString(['Carencias', 'promedio'], item.name),
        };
      });
      this.statisticsByOption = data;
    });
  }

  removeFromString(words: string[], str: string) {
    return words.reduce((result, word) => result.replace(word, ''), str);
  }
}
