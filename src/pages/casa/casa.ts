import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { SalaPage } from '../sala/sala';
import { DormiPage } from '../dormi/dormi';

@Component({
  selector: 'page-casa',
  templateUrl: 'casa.html'
})
export class CasaPage {
  RootSala: any = SalaPage;
  RootDormi: any = DormiPage;

  places = [
    {
      "room":'Sala',
      "page":SalaPage
    },{
      "room":'Dormitorio',
      "page":DormiPage
    },
  ];

  constructor(public navCtrl: NavController) {

  }

  goToPage(OtherPage) {
    this.navCtrl.push(OtherPage);
  }

}
