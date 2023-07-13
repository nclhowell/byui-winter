import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Bike } from '../../../bikes/bike.model';
import { BikeService } from '../../../bikes/bike.service';
import { BikesFilterPipe } from '../../bikes-filter.pipe'
@Component({
  selector: 'app-bike-item',
  templateUrl: './bike-item.component.html',
  styleUrls: ['./bike-item.component.css']
})

export class BikeItemComponent implements OnInit{
 @Input() bike: Bike;
 bikeSender: string;
 constructor (
  private bikeService: BikeService,

  ) {}
 ngOnInit(){
 }
 onSelected() {
   this.bikeService.bikeSelectedEvent.emit(this.bike);
 }
}
