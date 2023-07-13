import { Component, OnInit } from '@angular/core';
import { Bike } from './bike.model';
import { BikeService } from './bike.service';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.css'],
  providers: [BikeService]
})
export class BikesComponent implements OnInit {
  selectedBike: Bike;
  constructor(private bikeService: BikeService) { }
ngOnInit()
{
  this.bikeService.bikeSelectedEvent
  .subscribe(
    (bike: Bike) => {
      this.selectedBike = bike;
      console.log("This is the", bike);
    }
  );
}
}
