import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { Message } from '../../message.model';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  messages: Message[];
  currentSender = '9';
  @ViewChild('subjectInput', { static: false }) subjectInputRef: ElementRef;
  @ViewChild('msgTextInput', { static: false }) msgTextInputRef: ElementRef;
  // @Output() messageAdded = new EventEmitter<Message>();

  constructor(private messageService: MessageService) {}

  ngOnInit() {}

  addMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message("99", subject, msgText, this.currentSender);
    // this.messageAdded.emit(newMessage);
    this.messageService.addMessage(newMessage);
  }
  onClear() {
    console.log('Clear Message ran');
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}
