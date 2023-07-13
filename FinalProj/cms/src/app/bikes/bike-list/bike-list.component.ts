import { Component, OnInit} from '@angular/core';
import { Bike } from '../bike.model';
import { BikeService } from '../bike.service';
import { Subscription } from 'rxjs';
import { BikesFilterPipe } from '../bikes-filter.pipe';
// import { BikeItem } from '../bike';

@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.css'],
})
export class BikeListComponent implements OnInit {
  bikes: Bike[];
  BikeListChangedSubscription: Subscription;
  term: string;
  bikesfilterpipe: BikesFilterPipe

constructor(private bikeService: BikeService) {
    }

ngOnInit() {
  this.bikes = this.bikeService.getBikes();
      this.BikeListChangedSubscription = this.bikeService.bikeListChanged
      .subscribe(
        (bike: Bike[]) => {
          this.bikes = bike;
        }
      )
}

search(value: string) {
  this.term = value;
  }
  }
