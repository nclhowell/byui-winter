import { Component, OnInit} from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';
import { ContactsFilterPipe } from '../contacts-filter.pipe';
// import { ContactItem } from '../contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];
  ContactListChangedSubscription: Subscription;
  term: string;
  contactsfilterpipe: ContactsFilterPipe

constructor(private contactService: ContactService) {
    }

ngOnInit() {
  this.contacts = this.contactService.getContacts();
      this.ContactListChangedSubscription = this.contactService.contactListChanged
      .subscribe(
        (contact: Contact[]) => {
          this.contacts = contact;
        }
      )
}

search(value: string) {
  this.term = value;
  }
  }
