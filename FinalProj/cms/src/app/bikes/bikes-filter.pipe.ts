import { Pipe, PipeTransform } from '@angular/core';
import { Bike } from './bike.model';

@Pipe({
  name: 'bikesFilter'
})
export class BikesFilterPipe implements PipeTransform {


  transform(bikes: Bike[], term: any) {
    let filteredBikes: Bike[] =[];
    if (term && term.length > 0) {
       filteredBikes = bikes.filter(
          (bike:Bike) => bike.manufacturer.toLowerCase().includes(term.toLowerCase())
       );
    }
    if (filteredBikes.length < 1){
       return bikes;
    }
    return filteredBikes;
 }


  // transform(bikes: Bike[], term: any) {
  //   let filteredArray: Bike[] =[];
  //   for (let i=0; i<bikes.length; i++) {
  //      let bike = bikes[i];
  //      if (bike.name.toLowerCase().includes(term)) {
  //         filteredArray.push(bike);
  //      }
  //   }
  //   if (filteredArray.length < 1){
  //      return bikes;
  //   }
  //   return filteredArray;
  //  }

  //  transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }


}
