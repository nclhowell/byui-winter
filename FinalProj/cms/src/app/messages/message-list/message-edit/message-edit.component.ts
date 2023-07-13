import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { Message } from '../../message.model';
import { Bike } from '../../../bikes/bike.model';
import { MessageService } from '../../message.service';
import { BikeService } from '../../../bikes/bike.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  messages: Message[];
  currentBike: Bike;
  currentSender: Bike;
  // currentSender = '101';
  currentSenderName: string;
  currentBikeObjectId: string;
  @ViewChild('subjectInput', { static: false }) subjectInputRef: ElementRef;
  @ViewChild('msgTextInput', { static: false }) msgTextInputRef: ElementRef;
  // @Output() messageAdded = new EventEmitter<Message>();

  constructor(private messageService: MessageService, private bikeService: BikeService) {}

  ngOnInit() {
this.bikeService.getBike("101")
.subscribe(
  response => {
    this.currentSender = response.bike;
    this.currentSenderName = response.bike.id;
    this.currentBike = response.bike;
    this.currentBikeObjectId = response.bike.id;
  }
)
  }

  addMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    // const newMessage = new Message(null, "101", subject, msgText, this.currentBike);
    const newMessage = new Message("101", subject, msgText, this.currentSender);
    // console.log(newMessage);
    // this.messageAdded.emit(newMessage);
    this.messageService.addMessage(newMessage);
  }
  onClear() {
    console.log('Clear Message ran');
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}
