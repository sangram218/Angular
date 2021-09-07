import { Component } from '@angular/core';
import { ArtistComponent } from './artist/artist.component';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: '#c6ecff'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'emcee';
  msg:string=""
  receiveMsg($event:any){
    this.msg=$event
    console.log(this.msg)
  }
  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }
  constructor(){}
//   onOutletLoaded(artist:any) {
//     console.log("in outlet loaded")
//     artist.data = this.msg;
// }
}
