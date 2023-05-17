import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Message } from '../../message.model'
import { MessageService } from '../../message.service';
import { Contact } from '../../../contacts/contact.model';
import { ContactService } from '../../../contacts/contact.service';
@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})

export class MessageItemComponent implements OnInit{
 @Input() message: Message;
 messageSender: string;
 constructor (
  private messageService: MessageService,
  private contactService: ContactService,

  ) {}
 ngOnInit(){
      const contact: Contact = this.contactService.getContact(this.message.sender);
      this.messageSender = contact.name;
 }
 onSelected() {
   this.messageService.messageSelectedEvent.emit(this.message);
 //  this.messageService.getMessages();
  // console.log(this.messageService.getMessage("4"))
 // this.messageService.getMessage("2")
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
