import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { MarkerDto } from '../../../data/dto/Marker.dto';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit, AfterViewInit {
  @ViewChild('mapSearch') searchElementRef!: ElementRef;
  @ViewChild(GoogleMap) public map!: GoogleMap;

  @Input()
  viewAddressBox = true;
  latitude = 19.043764;
  longitude = -98.197851;
  zoom = 15;

  geocoder: google.maps.Geocoder;
  markers: google.maps.Marker[] = [];

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: this.latitude,
    lng: this.longitude,
  };

  form = new FormGroup({
    address: new FormControl('', []),
    lat: new FormControl('', []),
    lng: new FormControl('', []),
  });

  constructor() {
    this.geocoder = new google.maps.Geocoder();
  }

  ngOnInit(): void {
    console.log('ng OnInit');
  }

  ngAfterViewInit(): void {
    if (this.viewAddressBox) {
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

        this.decoderPosition();
      });
      console.log(searchBox);
    }
  }

  decoderPosition() {
    this.markers.forEach((marker) => {
      Swal.showLoading(null);
      this.geocoder
        .geocode({ location: marker.getPosition() })
        .then((response) => {
          if (response.results[0]) {
            console.log('geocoder ---> ', response.results[0]);
            this.form
              .get('address')
              ?.setValue(response.results[0].formatted_address);
            const lat = marker.getPosition()?.lat().toString();
            const lng = marker.getPosition()?.lng().toString();
            if (lat && lng) {
              this.form.get('lat')?.setValue(lat);
              this.form.get('lng')?.setValue(lng);
            }
            Swal.close();
          }
        })
        .catch((e) => console.log('Geocoder failed due to: ' + e));
    });
  }

  public setCenterMap(lat: number, lng: number, zoom: number) {
    this.center = {
      lat: lat,
      lng: lng,
    };

    this.zoom = zoom;
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng !== null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng !== null) this.display = event.latLng.toJSON();
  }

  onSubmit() {
    console.log('Stop...');
  }

  public drawGeoJson(geoJson: string) {
    this.map.data.loadGeoJson(geoJson);
    this.map.data.setStyle({
      fillColor: 'blue',
      strokeWeight: 1,
    });
    console.log('draw geoJson');
  }

  public drawMarkers(markers: MarkerDto[], onClick = false) {
    this.clearMarkersOnMap();
    markers.forEach((marker) => {
      const markerG = new google.maps.Marker({
        map: this.map.googleMap,
        // animation: google.maps.Animation.DROP,
        // label: {
        //     text: marker.label,
        //     color: 'black',
        //     fontSize: '12px',
        // },
        title: marker.label,
        position: { lat: marker.lat, lng: marker.lng },
        draggable: marker.draggable,
        icon: {
          // url: '',
          url: marker.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        },
      });

      if (onClick) {
        markerG.addListener('click', () => {
          if (this.map.googleMap) {
            this.map.googleMap.setZoom(13);
            this.map.googleMap.setCenter(
              markerG.getPosition() as google.maps.LatLng
            );
          }
        });
      }
      this.markers.push(markerG);
    });
  }

  public clearMarkersOnMap() {
    this.markers.forEach((marker) => {
      marker.setMap(null);
    });
    this.markers = [];
  }
}
