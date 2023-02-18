import { Component } from '@angular/core';

@Component({
  selector: 'app-newcomp2',
 // template: `<app-newcomp2></app-newcomp2><app-newcomp2></app-newcomp2>`,
 templateUrl:   './newcomp2.component.html',
 styleUrls: ['./newcomp2.component.css']
})
export class Newcomp2Component {
  serverCreationStatus = 'Dude, No Server was created';
  allowNewServer = false;
  serverName = "Shlepper";
  serverCreated = false;
  servers = ['TestServer1', 'TestServer2'];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }
  onCreateServer(){
this.serverCreated = true;
this.servers.push(this.serverName);
this.serverCreationStatus = 'Server was created... Name is ' + this.serverName;
this.serverCreationStatus = 'No Server was created...';
  }
  onUpdateServerName(event: any){
    //console.log(event);
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
