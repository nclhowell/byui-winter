import { Component } from '@angular/core';
@Component({
  selector: 'app-newcomp',
  templateUrl: './newcomp.component.html',
  //  styleUrls: ['./newcomp.component.css']
  styles: [
    `
      .serverup {
        color: white;
      }
      h3 {
        color: darkblue;
      }
    `,
  ],
})
export class NewcompComponent {
  serverId: number = 10;
  serverStatus: string = 'broken';
  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'up' : 'down';
  }
  getServerStatus() {
    return this.serverStatus;
  }
  getColor() {
    return this.serverStatus === 'up' ? 'lightgreen' : 'pink';
  }
}
