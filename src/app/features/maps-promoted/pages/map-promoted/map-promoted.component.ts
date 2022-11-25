import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import {
  OperatorTypeService,
  PromoterService,
} from '../../../../data/services/promoter.service';
import { map, Observable, tap } from 'rxjs';

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

  constructor(private dataService: OperatorTypeService) {
    this.heatmapData$ = this.dataService.fetchAll().pipe(
      map(({ data }) => data.map(({ lng, lat }) => ({ lat: +lat, lng: +lng }))),
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
