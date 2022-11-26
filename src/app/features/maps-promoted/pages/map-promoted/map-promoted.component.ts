import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import {
  ActivistTypeService,
  AreaManagerService,
  DistrictCoordinatorService,
  PromoterService,
  SectionManagerService,
} from '../../../../data/services/promoter.service';
import { map, Observable, switchMap, tap } from 'rxjs';
import { MessageHelper } from 'o2c_core';
import { RefreshCountdown, SECOND } from '../../../../core/refresh-countdown';
import { Promoter } from '../../../../data/models/Promoter.model';
import { FormControl } from '@angular/forms';

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

  refreshCountDown = new RefreshCountdown(REFRESH_TIME);

  rolControl = new FormControl(1, { nonNullable: true });
  roles = Promoter.ROL;
  private _dataService: PromoterService = this.districtCoordinatorService;

  constructor(
    private districtCoordinatorService: DistrictCoordinatorService,
    private areaManagerService: AreaManagerService,
    private sectionManagerService: SectionManagerService,
    private activistTypeService: ActivistTypeService
  ) {
    this.heatmapData$ = this.refreshCountDown.refresh$.pipe(
      tap(() => MessageHelper.showLoading('Obteniendo información')),
      switchMap(() =>
        this._dataService.fetchAll().pipe(
          map(({ data }) =>
            data.map(({ lng, lat }) => ({ lat: +lat, lng: +lng }))
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
            this.activistTypeService,
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
      fillColor: '#eee',
      strokeWeight: 0.6,
      strokeOpacity: 1,
    });
  }
}
