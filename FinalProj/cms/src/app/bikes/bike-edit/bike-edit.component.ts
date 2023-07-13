import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  NgForm,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BikeService } from '../bike.service';
import { Bike } from '../bike.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'app-bike-edit',
  templateUrl: './bike-edit.component.html',
  styleUrls: ['./bike-edit.component.css'],
})
export class BikeEditComponent implements OnInit {
  originalBike: Bike;
  groupBikes: Bike[] = [];
  bike: Bike;
  newBike: Bike;
  value: Bike;
  editMode: boolean = false;
  groupMode: boolean = false;
  // name: string = '';
  // tsdocId = { id: 'enter id here' };
  // tsdocName = { name: 'enter name here' };
  // tsdocDesc = { description: 'enter description here' };
  // tsdocUrl = { url: 'enter url here' };
  // tdocId = { id: 'enter id here' };
  tdocManufacturer = 'Enter Manufacturer here';
  tdocModel = 'Enter Model here (Must begin with "Dude")';
  tdocTerrainType = 'Enter Terrain here (Must begin with "Gnarly")';
  tdocUrl = 'Enter URL here';

  manufacturer = 'Enter manufacturer here';
  model = 'Enter model here';
  terrainType = 'Enter terrain here';
  url = 'Enter URL here';

  tsWhat = true;
  fid: string = '80';
  id: string;
  noid: string;
  strid: string;

  constructor(
    private bikeService: BikeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
   this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.bikeService.getBike(this.id)
        .subscribe(bikeData => {
         this.bike = bikeData.bike
      });
      console.log (this.bike)
      this.manufacturer = this.bike.manufacturer;
      this.model = this.bike.model;
      this.terrainType = this.bike.terrainType;
      this.url = this.bike.url;

      if (!this.originalBike) {
       return;
     }
     // this.bike = this.originalBike;
     // Parse this.bike
     this.bike = JSON.parse(JSON.stringify(this.originalBike));
      // if (this.bike.group) {
      //   this.groupMode = true;
      //   this.groupBikes = this.originalBike.group.slice();
      //   // console.log(this.groupBikes[1]);
      // }
      this.editMode = true;
    });
  }

  onSubmit(f: NgForm) {
    // f.value.id = "80"; // Set blank formId
    // console.log('All Form Fields :', f);
    // console.log('Form Input = ', f.value);
    // this.bike = (this.id, f.value.name, f.value.url)
    this.newBike = f.value;
    // console.log('New Bike from form', this.newBike);
    if (this.editMode == true) {
      this.bikeService.updateBike(this.originalBike, this.newBike);
    } else {
      this.bikeService.addBike(this.newBike);
    }

    this.router.navigate(['/bikes']);
    // console.log(f)
    // console.log(this.tsdocTitle)
    //console.log("Title Value is:", f.value.docTitle)
    //console.log("Description Value is:", f.value.docDesc)
    // console.log("Url Value is:", f.value.docUrl)
    // console.log("Url Value is:", f.value.docUrl)
  }

  onCancel() {
    this.router.navigate(['/bikes']);
  }
}
