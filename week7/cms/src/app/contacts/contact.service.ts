import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

 @Injectable({
    providedIn: 'root'
})
export class ContactService {
 contacts: Contact[] = [];
 contactListClone: Contact[] = [];
 maxid = 0;
 maxContactId: number
 // Observables
 ContactListChanged = new Subject<Contact[]>();
 // Event Emitters
  contactSelectedEvent = new EventEmitter<Contact>();
  contactsChangedEvent = new EventEmitter<Contact[]>();
  contactChangedEvent = new EventEmitter<Contact>();

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxContactId()
  }
  getContacts() {
    return this.contacts.slice();
  }

  getMaxContactId() {
    let maxId = 0;
    let currentId = 0;
    for (let contact of this.contacts) {
      currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    console.log(maxId);
    return maxId;
  }

  addContact(newcontact: Contact) {
    if (!newcontact) {
      return;
    }
    this.maxContactId++;
    newcontact.id = this.maxContactId.toString();
    this.contacts.push(newcontact);
    this.contactListClone = this.contacts.slice();
    this.ContactListChanged.next(this.contactListClone);
  }

  updateContact(contact: Contact, newContact: Contact) {
    if (!contact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    newContact.id = contact.id;
    contact[pos] = newContact;
    this.contactListClone = this.contacts.slice();
    this.ContactListChanged.next(this.contactListClone);
  }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        console.log(contact);
        return contact;
      }
    }
  }
  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactListClone = this.contacts.slice();
    this.ContactListChanged.next(this.contactListClone);
  }

//   deleteContact(contact: Contact) {
//     if (!contact) {
//        return;
//     }
//     const pos = this.contacts.indexOf(contact);
//     if (pos < 0) {
//        return;
//     }
//     this.contacts.splice(pos, 1);
//    // this.contactChangedEvent.emit(contact);
//     this.ContactListChanged.next(this.contacts.slice());
//  };


  //  getContact(id: string): Contact {
  //   for (let contact of this.contacts) {
  //     if (contact.id === id) {
  //      // console.log(contact);
  //        return contact;
  //      }
  //    }
  //  }

    addContacts(contacts: Contact) {
    // for (let contact of contacts) {
    //   this.addContact(contact);
    // }
    // this.contacts.push(contacts);
    // this.contactsChangedEvent.emit(this.contacts.slice());
    this.ContactListChanged.next(this.contacts.slice());

}

}
  //  addContact(contact: Contact){
  //   // console.log (this.contacts);
  //   this.contacts.push(contact);
  //   this.ContactListChanged.next(this.contacts.slice());
  // }
