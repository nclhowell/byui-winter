import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Bike } from '../bike.model';
import { BikeService } from '../bike.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-bike-detail',
  templateUrl: './bike-detail.component.html',
  styleUrls: ['./bike-detail.component.css']
})
export class BikeDetailComponent implements OnInit{
    id: string;
    strid: string;
    bike: Bike;
    bikeData: Bike;
    groupBikes: Bike[] = [];
    nativeWindow: any;

  constructor(private windrefservice: WindRefService,
              private bikeService: BikeService,
              private route: ActivatedRoute,
              private router: Router) {
              this.nativeWindow = this.windrefservice.getNativeWindow();
  }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.bikeService.getBike(this.id)
        .subscribe(bikeData => {
          this.bike = bikeData.bike;
        });
        //this.id = "48";
      }
    );
  //   if (this.bike.group){
  //     this.groupBikes = this.bike.group
  //   }
  }

  onDelete() {
    this.bikeService.deleteBike(this.bike);
    this.bikeService.getMaxBikeId()
    }


  onView() {
    // if (this.bike.url){
    //  this.nativeWindow.open(this.bike.url);
    }
  }


