import { Component, ViewChild, ElementRef } from '@angular/core';

import {
  GoogleMaps,
  GoogleMap,
  CameraPosition,
  LatLng,
  GoogleMapsEvent,
  Marker,
  MarkerOptions} from "@ionic-native/google-maps";

import { NavController } from 'ionic-angular';

import { Geolocation } from "@ionic-native/geolocation";

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;

  constructor(public navCtrl: NavController,
              private _googleMaps: GoogleMaps,
              private _geoLoc: Geolocation) {}

  ngAfterViewInit(){
    let loc: LatLng;
    this.initMap();

    //once the map is ready move
    //camera into position
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      //Get User location
      this.getLocation().then( res => {
        loc = new LatLng(res.coords.latitude, res.coords.longitude);
        this.moveCamera(loc);

        this.createMarker(loc, "trouvé"). then((marker: Marker) => {
          marker.showInfoWindow();
        }).catch(err => {
          console.log(err);
        })
      }).catch( err => {
        console.log(err);
      });
    });
  }

  initMap(){
    let element = this.mapElement.nativeElement;
    this.map = this._googleMaps.create(element)
  }

  getLocation(){
    return this._geoLoc.getCurrentPosition();
  }

  //Moves the camera to any location
  moveCamera(loc: LatLng){
    let options: CameraPosition<LatLng> = {
      //specify center of map
      target: loc,
      zoom: 15,
      tilt: 10
    }
    this.map.moveCamera(options)
  }

  //Adds a marker to the map
  createMarker(loc: LatLng, title: string){
    let markerOptions: MarkerOptions = {
      position: loc,
      title: title
    };

    return this.map.addMarker(markerOptions);
  }

}
