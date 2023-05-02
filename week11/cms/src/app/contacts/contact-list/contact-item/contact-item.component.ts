import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Contact } from '../../../contacts/contact.model';
import { ContactService } from '../../../contacts/contact.service';
import { ContactsFilterPipe } from '../../contacts-filter.pipe'
@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})

export class ContactItemComponent implements OnInit{
 @Input() contact: Contact;
 contactSender: string;
 constructor (
  private contactService: ContactService,

  ) {}
 ngOnInit(){
 }
 onSelected() {
   this.contactService.contactSelectedEvent.emit(this.contact);
 }
}
