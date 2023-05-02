import { Component, OnInit, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Contact } from '../../contacts/contact.model';
import { ContactService } from '../../contacts/contact.service';
// import { MessageItem } from '../message';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {

  messages: Message[];
  blahstring: string;
  contacts: ContactService;

  constructor(private msgService: MessageService
    ) {}

  ngOnInit() {
    this.messages = this.msgService.getMessages();
    this.msgService.messageListChanged.subscribe((messages: Message[]) => {
      this.messages = messages;
      console.log(this.messages);
    });
  }
}
