import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { OperatorTypeService } from '../../../../data/services/promoter.service';
import {
  map,
  Observable,
  scan,
  startWith,
  Subject,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { MessageHelper } from 'o2c_core';
import { format } from 'date-fns';

const SECOND = 1_000;
const REFRESH_TIME = 2 * 60 * SECOND;

@Component({
  selector: 'app-map-promoted',
  templateUrl: './map-promoted.component.html',
  styleUrls: ['./map-promoted.component.scss'],
})
export class MapPromotedComponent implements AfterViewInit {
  @ViewChild(GoogleMap) public map!: GoogleMap;
  latitude = 18.073187012188487;
  longitude = -92.69948315869415;
  zoom = 8.6;

  center: google.maps.LatLngLiteral = {
    lat: this.latitude,
    lng: this.longitude,
  };

  heatmapOptions = { radius: 10 };
  heatmapData$!: Observable<{ lat: number; lng: number }[]>;

  click$ = new Subject<number>();
  refresh$ = this.click$.asObservable().pipe(
    startWith(0),
    switchMap(() => timer(0, REFRESH_TIME))
  );
  clock$ = this.refresh$.pipe(
    switchMap(() =>
      timer(0, SECOND).pipe(
        scan((accumulator) => accumulator - SECOND, REFRESH_TIME)
      )
    ),
    map((time) => format(time, 'mm:ss'))
  );

  constructor(private dataService: OperatorTypeService) {
    this.heatmapData$ = this.refresh$.pipe(
      tap(() => MessageHelper.showLoading('Obteniendo información')),
      switchMap(() =>
        this.dataService.fetchAll().pipe(
          map(({ data }) =>
            data.map(({ lng, lat }) => ({ lat: +lat, lng: +lng }))
          ),
          tap(() => MessageHelper.getInstanceSwal().close()),
          map((value) => [
            ...value,
            ...[
              {
                lat: this.latitude,
                lng: this.longitude,
              },
              {
                lat: this.latitude,
                lng: this.longitude,
              },
              {
                lat: this.latitude,
                lng: this.longitude,
              },
              {
                lat: this.latitude,
                lng: this.longitude,
              },
              {
                lat: this.latitude,
                lng: this.longitude,
              },
              {
                lat: this.latitude,
                lng: this.longitude,
              },
            ],
          ])
        )
      )
    );
  }

  ngAfterViewInit(): void {
    this.drawGeoJson('./../assets/geojson/tabasco_municipalities.json');
  }

  drawGeoJson(geoJson: string) {
    this.map.data.loadGeoJson(geoJson);
    this.map.data.setStyle({
      fillColor: '#eee',
      strokeWeight: 0.6,
      strokeOpacity: 1,
    });
  }
}
