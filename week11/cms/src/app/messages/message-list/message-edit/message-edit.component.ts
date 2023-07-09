import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { Message } from '../../message.model';
import { Contact } from '../../../contacts/contact.model';
import { MessageService } from '../../message.service';
import { ContactService } from '../../../contacts/contact.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  messages: Message[];
  currentContact: Contact;
  currentSender: Contact;
  // currentSender = '101';
  currentSenderName: string;
  currentContactObjectId: string;
  @ViewChild('subjectInput', { static: false }) subjectInputRef: ElementRef;
  @ViewChild('msgTextInput', { static: false }) msgTextInputRef: ElementRef;
  // @Output() messageAdded = new EventEmitter<Message>();

  constructor(private messageService: MessageService, private contactService: ContactService) {}

  ngOnInit() {
this.contactService.getContact("101")
.subscribe(
  response => {
    this.currentSender = response.contact;
    this.currentSenderName = response.contact.id;
    this.currentContact = response.contact;
    this.currentContactObjectId = response.contact.id;
  }
)
  }

  addMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    // const newMessage = new Message(null, "101", subject, msgText, this.currentContact);
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
