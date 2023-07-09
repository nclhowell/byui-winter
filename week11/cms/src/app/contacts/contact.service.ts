import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
// import { MOCKCONTACTS } from './MOCKCONTACTS';
import { json } from 'body-parser';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  // firebaseURIdocsArray: string = "https://wdd430cms0-default-rtdb.firebaseio.com/contacts.json";
  mongoURIdocsArray: string = 'http://localhost:3000/contacts';
  // jsondocs: Contact[] = [];
  contacts: Contact[] = [];
  contact: Contact;
  message: string = 'generic message';
  //  docsArray: Contact[] = MOCKCONTACTS;
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChanged = new Subject<Contact[]>();
  maxContactId: number;

  constructor(private http: HttpClient) {}

  getContacts() {
    this.http
      .get<{ message: string; contacts: Contact[] }>(this.mongoURIdocsArray)
      .subscribe((docs) => {
        this.contacts = docs.contacts;
        this.maxContactId = this.getMaxContactId();
        this.contacts.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
       // console.log(this.contacts);
        this.contactListChanged.next(this.contacts.slice());
      });
    return this.contacts.slice();
  }

  getContact(id: string) {
    return this.http.get<{ message: string; contact: Contact }>('http://localhost:3000/contacts/' + id);
  }
  // getContact(id: string): Contact {

  //   for (const contact of this.contacts) {
  //     if (contact.id == id) {

  //       //console.log("found!")
  //       return contact;
  //     }
  //   }
  //   return null;
  // }

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    // make sure id of the new Contact is empty
    contact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; contact: Contact }>(
        'http://localhost:3000/contacts',
        contact,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new contact to docsArray
        this.contacts.push(responseData.contact);
        this.sortAndSend();
      });
  }

  // addContact(newContact: Contact) {
  //   if (newContact == undefined || newContact == null) {
  //     return;
  //   }

  //   this.maxContactId++;
  //   newContact.id = String(this.maxContactId);
  //   this.docsArray.push(newContact)
  //   this.storeContacts();
  // }

  // updateContact(originalContact: Contact, newContact: Contact) {
  //   if (originalContact == null || originalContact == null || originalContact == undefined || originalContact == undefined) {
  //     return;
  //   }

  //   const pos = this.docsArray.indexOf(originalContact);
  //   if (pos < 0) {
  //     return;
  //   }

  //   newContact.id = originalContact.id;
  //   this.docsArray[pos] = newContact;
  //   this.storeContacts();
  // }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex((d) => d.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Contact to the id of the old Contact
    newContact.id = originalContact.id;
    // newContact._id = originalContact._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put('http://localhost:3000/contacts/' + originalContact.id, newContact, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.contacts[pos] = newContact;
        this.sortAndSend();
      });
  }

  // deleteContact(contact: Contact) {
  //   if (!contact) {
  //     return;
  //   }
  //   const pos = this.docsArray.indexOf(contact);
  //   if (pos < 0) {
  //     return;
  //   }
  //   this.docsArray.splice(pos, 1);
  //   this.storeContacts();
  // }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex((d) => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe((response: Response) => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      });
  }

  getMaxContactId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      if (+contact.id > maxId) {
        maxId = +contact.id;
      }
    }
    return maxId;
  }

  storeContacts() {
    this.http
      .put(this.mongoURIdocsArray, JSON.stringify(this.contacts), {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe({
        next: () => this.contactListChanged.next(this.contacts.slice()),
        error: (evar) => console.error('Error saving docsArray: ', evar),
      });
  }

  sortAndSend() {
    this.contacts.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.contactListChanged.next(this.contacts.slice());
  }
}
