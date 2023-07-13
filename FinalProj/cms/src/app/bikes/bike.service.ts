import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Bike } from './bike.model'
// import { MOCKCONTACTS } from './MOCKCONTACTS';
import { json } from 'body-parser';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class BikeService {
  // firebaseURIdocsArray: string = "https://wdd430cms0-default-rtdb.firebaseio.com/bikes.json";
  mongoURIdocsArray: string = 'http://localhost:3000/bikes';
  // jsondocs: Bike[] = [];
  bikes: Bike[] = [];
  bike: Bike;
  message: string = 'generic message';
  //  docsArray: Bike[] = MOCKCONTACTS;
  bikeSelectedEvent = new EventEmitter<Bike>();
  bikeChangedEvent = new EventEmitter<Bike[]>();
  bikeListChanged = new Subject<Bike[]>();
  maxBikeId: number;

  constructor(private http: HttpClient) {}

  getBikes() {
    this.http
      .get<{ message: string; bikes: Bike[] }>(this.mongoURIdocsArray)
      .subscribe((docs) => {
        this.bikes = docs.bikes;
        this.maxBikeId = this.getMaxBikeId();
        this.bikes.sort((a, b) => {
          if (a.manufacturer < b.manufacturer) {
            return -1;
          }
          if (a.manufacturer > b.manufacturer) {
            return 1;
          }
          return 0;
        });
       // console.log(this.bikes);
        this.bikeListChanged.next(this.bikes.slice());
      });
    return this.bikes.slice();
  }

  getBike(id: string) {
    console.log(id);
    return this.http.get<{ message: string; bike: Bike }>('http://localhost:3000/bikes/' + id);
  }
  // getBike(id: string): Bike {

  //   for (const bike of this.bikes) {
  //     if (bike.id == id) {

  //       //console.log("found!")
  //       return bike;
  //     }
  //   }
  //   return null;
  // }

  addBike(bike: Bike) {
    if (!bike) {
      return;
    }

    // make sure id of the new Bike is empty
    bike.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; bike: Bike }>(
        'http://localhost:3000/bikes',
        bike,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new bike to docsArray
        this.bikes.push(responseData.bike);
        this.sortAndSend();
      });
  }

  // addBike(newBike: Bike) {
  //   if (newBike == undefined || newBike == null) {
  //     return;
  //   }

  //   this.maxBikeId++;
  //   newBike.id = String(this.maxBikeId);
  //   this.docsArray.push(newBike)
  //   this.storeBikes();
  // }

  // updateBike(originalBike: Bike, newBike: Bike) {
  //   if (originalBike == null || originalBike == null || originalBike == undefined || originalBike == undefined) {
  //     return;
  //   }

  //   const pos = this.docsArray.indexOf(originalBike);
  //   if (pos < 0) {
  //     return;
  //   }

  //   newBike.id = originalBike.id;
  //   this.docsArray[pos] = newBike;
  //   this.storeBikes();
  // }

  updateBike(originalBike: Bike, newBike: Bike) {
    if (!originalBike || !newBike) {
      return;
    }

    const pos = this.bikes.findIndex((d) => d.id === originalBike.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Bike to the id of the old Bike
    newBike.id = originalBike.id;
    // newBike._id = originalBike._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put('http://localhost:3000/bikes/' + originalBike.id, newBike, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.bikes[pos] = newBike;
        this.sortAndSend();
      });
  }

  // deleteBike(bike: Bike) {
  //   if (!bike) {
  //     return;
  //   }
  //   const pos = this.docsArray.indexOf(bike);
  //   if (pos < 0) {
  //     return;
  //   }
  //   this.docsArray.splice(pos, 1);
  //   this.storeBikes();
  // }

  deleteBike(bike: Bike) {
    if (!bike) {
      return;
    }

    const pos = this.bikes.findIndex((d) => d.id === bike.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:3000/bikes/' + bike.id)
      .subscribe((response: Response) => {
        this.bikes.splice(pos, 1);
        this.sortAndSend();
      });
  }

  getMaxBikeId(): number {
    let maxId = 0;
    for (const bike of this.bikes) {
      if (+bike.id > maxId) {
        maxId = +bike.id;
      }
    }
    return maxId;
  }

  storeBikes() {
    this.http
      .put(this.mongoURIdocsArray, JSON.stringify(this.bikes), {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe({
        next: () => this.bikeListChanged.next(this.bikes.slice()),
        error: (evar) => console.error('Error saving docsArray: ', evar),
      });
  }

  sortAndSend() {
    this.bikes.sort((a, b) => {
      if (a.manufacturer < b.manufacturer) {
        return -1;
      }
      if (a.manufacturer > b.manufacturer) {
        return 1;
      }
      return 0;
    });
    this.bikeListChanged.next(this.bikes.slice());
  }
}
