import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import {
  ActivistTypeService,
  AreaManagerService,
  DistrictCoordinatorService,
  PromoterService,
  SectionManagerService,
  SympathizerService,
} from '../../../../data/services/promoter.service';
import { map, Observable, switchMap, tap } from 'rxjs';
import { MessageHelper } from 'o2c_core';
import { RefreshCountdown, SECOND } from '../../../../core/refresh-countdown';
import { Promoter } from '../../../../data/models/Promoter.model';
import { FormControl } from '@angular/forms';
import { PeopleService } from '../../../../data/services/people.service';

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

  heatmapOptions = { radius: 20 };
  heatmapData$!: Observable<{ lat: number; lng: number }[]>;

  refreshCountDown = new RefreshCountdown(REFRESH_TIME);

  rolControl = new FormControl(1, { nonNullable: true });
  roles = Promoter.ROL;
  private _dataService: PromoterService = this.districtCoordinatorService;

  constructor(
    private districtCoordinatorService: DistrictCoordinatorService,
    private areaManagerService: AreaManagerService,
    private sectionManagerService: SectionManagerService,
    private activistTypeService: ActivistTypeService,
    private peopleService: PeopleService
  ) {
    //Todo hay que hacer la duplicidad de información, para que se mapee la información real
    this.heatmapData$ = this.refreshCountDown.refresh$.pipe(
      tap(() => MessageHelper.showLoading('Obteniendo información')),
      switchMap(() =>
        this._dataService.fetchAll().pipe(
          map(({ data }) =>
            [
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
            ]
              .map(({ lng, lat }) => ({ lat: +lat, lng: +lng }))
              .map(() => generateLocation(this.latitude, this.longitude, 40))
          ),
          tap(() => MessageHelper.getInstanceSwal().close())
        )
      )
    );

    this.rolControl.valueChanges
      .pipe(
        map((option: number): PromoterService => {
          const options: PromoterService[] = [
            this.districtCoordinatorService,
            this.areaManagerService,
            this.sectionManagerService,
            this.activistTypeService,
            this.peopleService,
          ];
          return options[+option - 1];
        }),
        tap((service: PromoterService) => (this._dataService = service))
      )
      .subscribe(() => this.refreshCountDown.resetCountDown());
  }

  ngAfterViewInit(): void {
    this.drawGeoJson('./../assets/geojson/tabasco_municipalities.json');
  }

  drawGeoJson(geoJson: string) {
    this.map.data.loadGeoJson(geoJson);
    this.map.data.setStyle({
      fillColor: '#ddd',
      strokeWeight: 2,
      strokeOpacity: 1,
    });
  }
}

// Final Code Here
function generateLocation(
  latitude: number,
  longitude: number,
  max: number,
  min = 0
) {
  if (min > max) {
    throw new Error(`min(${min}) cannot be greater than max(${max})`);
  }

  // earth radius in km
  const EARTH_RADIUS = 6371;

  // 1° latitude in meters
  const DEGREE = ((EARTH_RADIUS * 2 * Math.PI) / 360) * 1000;

  // random distance within [min-max] in km in a non-uniform way
  const maxKm = max * 1000;
  const minKm = min * 1000;
  const r = (maxKm - minKm + 1) * Math.random() ** 0.5 + minKm;

  // random angle
  const theta = Math.random() * 2 * Math.PI;

  const dy = r * Math.sin(theta);
  const dx = r * Math.cos(theta);

  const newLatitude = latitude + dy / DEGREE;
  const newLongitude = longitude + dx / (DEGREE * Math.cos(deg2rad(latitude)));

  const distance = getDistanceFromLatLonInKm(
    latitude,
    longitude,
    newLatitude,
    newLongitude
  );

  return {
    lat: newLatitude,
    lng: newLongitude,
    // distance: Math.round(distance),
  };
}

// See https://stackoverflow.com/a/27943/10975709
function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km

  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
