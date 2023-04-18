import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

 @Injectable({
    providedIn: 'root'
})
export class ContactService {
  contact: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  // contactChangedEvent = new EventEmitter<string>();
  contactsChangedEvent = new EventEmitter<Contact[]>();
  contactChangedEvent = new EventEmitter<Contact>()

  constructor() {
    this.contact = MOCKCONTACTS;
  }
  getContacts() {
    return this.contact.slice();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
       return;
    }
    const pos = this.contact.indexOf(contact);
    if (pos < 0) {
       return;
    }
    this.contact.splice(pos, 1);
    this.contactChangedEvent.emit(contact);
 };
   getContact(id: string): Contact {
    for (let contact of this.contact) {
      if (contact.id === id) {
       // console.log(contact);
         return contact;
       }
     }
   }
   addContact(contact: Contact){
    // console.log (this.contacts);
    this.contact.push(contact);
   // this.contactChangedEvent.emit(this.contacts.slice());
   // this.contactChangedEvent.emit;
     //console.log (this.contacts.slice());
     this.contactsChangedEvent.emit(this.contact.slice())
     // console.log (this.contacts.slice());
  }
    addContacts(contacts: Contact) {
    // for (let contact of contacts) {
    //   this.addContact(contact);
    // }
    // this.contacts.push(contacts);
    // this.contactsChangedEvent.emit(this.contacts.slice());

}





}
