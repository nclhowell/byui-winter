import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

 @Injectable({
    providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }
  getContacts() {
    return this.contacts.slice();
  }

  //  getContact(id:string){
  //   // return this.contacts.slice();
  //   console.log ("getContact ID = ", id)
  // }
   getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id == id) {
     // console.log(contact);
         return contact;
       }
     }
   }
}
