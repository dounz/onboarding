import { Component } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { MainPage} from "../main/main";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  skipMsg: string = "Passer";
  state: string = 'x';


  constructor(public navCtrl: NavController) {

  }

  skip(){
    this.navCtrl.push(MainPage);
  }
}
