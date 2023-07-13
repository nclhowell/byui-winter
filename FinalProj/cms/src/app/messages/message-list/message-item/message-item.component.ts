import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Message } from '../../message.model';
import { MessageService } from '../../message.service';
import { Bike } from '../../../bikes/bike.model';
import { BikeService } from '../../../bikes/bike.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  constructor(private bikeService: BikeService, private messageService: MessageService) {
// console.log("Whatever");
// this.bikeService.getBike("101");
  }

  ngOnInit() {
    this.bikeService.getBike(this.message.id)
      .subscribe((bikeData) => {
        this.messageSender = bikeData.bike.manufacturer;
      });
  }
}
// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { Message } from '../../message.model'

// @Component({
//   selector: 'app-message-item',
//   templateUrl: './message-item.component.html',
//   styleUrls: ['./message-item.component.css']
// })

// export class MessageItemComponent {
//  @Input() message: Message;
//  @Output() messageSelected = new EventEmitter<void>();
//  onSelected() {
//   this.messageSelected.emit();
// }

// }
