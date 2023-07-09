import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Message } from '../../message.model';
import { MessageService } from '../../message.service';
import { Contact } from '../../../contacts/contact.model';
import { ContactService } from '../../../contacts/contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  constructor(private contactService: ContactService, private messageService: MessageService) {
// console.log("Whatever");
// this.contactService.getContact("101");
  }

  ngOnInit() {
    this.contactService.getContact(this.message.id)
      .subscribe((contactData) => {
        this.messageSender = contactData.contact.name;
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
