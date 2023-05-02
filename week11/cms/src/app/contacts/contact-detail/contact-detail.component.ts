import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit{
    id: string;
    strid: string;
    contact: Contact;
    groupContacts: Contact[] = [];
    nativeWindow: any;

  constructor(private windrefservice: WindRefService,
              private contactService: ContactService,
              private route: ActivatedRoute,
              private router: Router) {
              this.nativeWindow = this.windrefservice.getNativeWindow();
  }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        // this.id = "48";
        // console.log(this.id);
        this.contact = this.contactService.getContact(this.id);
      }
    );
    if (this.contact.group){
      this.groupContacts = this.contact.group
    }
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.contactService.getMaxContactId()
    }


  onView() {
    // if (this.contact.url){
    //  this.nativeWindow.open(this.contact.url);
    }
  }


