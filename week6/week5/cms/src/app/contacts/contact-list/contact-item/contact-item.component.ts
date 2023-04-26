import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Contact } from '../../contact.model'
import { ContactService } from '../../contact.service';
@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})

export class ContactItemComponent {
 @Input() contact: Contact;
 constructor (private contactService: ContactService) {}
 ngOnInit(){
 }
 onSelected() {
   this.contactService.contactSelectedEvent.emit(this.contact);

  // console.log(this.contactService.getContact("4"))
 // this.contactService.getContact("2")
}
}
