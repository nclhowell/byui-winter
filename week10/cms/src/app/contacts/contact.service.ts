import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  fbURIcontacts: string = "https://wdd430cms0-default-rtdb.firebaseio.com/contacts.json";
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  // contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChanged = new Subject<Contact[]>();
  maxContactId: number;

  constructor(private httpCient: HttpClient) {
    //this.contacts = MOCKCONTACTS;
    this.contacts = this.getContacts();
    this.maxContactId = this.getMaxContactId();
  }

  getContacts(): Contact[] {

    this.httpCient.get<Contact[]>(this.fbURIcontacts).subscribe(docs => {
      // console.log(docs);
      this.contacts = docs;
      this.maxContactId = this.getMaxContactId();
	  // Alphabetical Sort
      this.contacts.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      this.contactListChanged.next(this.contacts.slice())
    });
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id == id) {
        //console.log("found!")
        return contact;
      }
    }
    return null;
  }

  addContact(newContact: Contact) {
    if (newContact == undefined || newContact == null) {
      return;
    }

    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact)
    //this.contactListChanged.next(this.getContacts())
    this.storeContacts();
  }
  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact == null || originalContact == undefined) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    //this.contactListChanged.next(this.getContacts())
    this.storeContacts();
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
    //this.contactChangedEvent.emit(this.contacts.slice());
    //this.contactListChanged.next(this.getContacts());
    this.storeContacts();
  }

  getMaxContactId(): number {
    //return this.contacts.sort(d=>d.id)[0];
    let maxId = 0
    for (const contact of this.contacts) {
      if (+contact.id > maxId) {
        maxId = +contact.id;
      }
    }
    return maxId;
  }

  storeContacts() {
    this.httpCient.put(this.fbURIcontacts, JSON.stringify(this.contacts)
      , { headers: new HttpHeaders({ "Content-Type": "application/json" }) })
      .subscribe(
        {
          next: () => this.contactListChanged.next(this.contacts.slice())
          , error: (evar) => console.error('Error saving contacts: ', evar)
        }
      )
  }
}
