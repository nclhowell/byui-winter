import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  NgForm,
} from '@angular/forms';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  groupContacts: Contact[] = [];
  contact: Contact;
  newContact: Contact;
  value: Contact;
  editMode: boolean = false;
  groupMode: boolean = false;
  // name: string = '';
  // tsdocId = { id: 'enter id here' };
  // tsdocName = { name: 'enter name here' };
  // tsdocDesc = { description: 'enter description here' };
  // tsdocUrl = { url: 'enter url here' };
  // tdocId = { id: 'enter id here' };
  tdocName = 'enter name here';
  tdocEmail = 'enter email here';
  tdocPhone = 'enter phone here';
  tdocImageurl = 'enter URL here';

  name = 'enter name here';
  email = 'enter email here';
  phone = 'enter phone here';
  imageUrl = 'enter URL here';

  tsWhat = true;
  fid: string = '80';
  id: string;
  noid: string;
  strid: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      // console.log(params['id']);
      if (!params['id']) {
        this.editMode = false;
        return;
      }
      // grab contact using current doc ID
      this.id = params['id'];
      this.originalContact = this.contactService.getContact(this.id);
      this.name = this.originalContact.name;
      this.email = this.originalContact.email;
      this.phone = this.originalContact.phone;
      this.imageUrl = this.originalContact.imageUrl;

      if (!this.originalContact) {
        return;
      }
      // this.contact = this.originalContact;
      // Parse this.contact
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
      if (this.contact.group)
      {
        this.groupMode = true;
        this.groupContacts = this.originalContact.group.slice()
        console.log(this.groupContacts[1])
      }
      this.editMode = true;
      // console.log('Cloned Doc = ', this.contact);
    });
  }

  onSubmit(f: NgForm) {
    // f.value.id = "80"; // Set blank formId
    // console.log('All Form Fields :', f);
    // console.log('Form Input = ', f.value);
    // this.contact = (this.id, f.value.name, f.value.url)
    this.newContact = f.value;
    // console.log('New Contact from form', this.newContact);
    if (this.editMode == true) {
      this.contactService.updateContact(this.originalContact, this.newContact);
    } else {
      this.contactService.addContact(this.newContact);
    }

    this.router.navigate(['/contacts']);
    // console.log(f)
    // console.log(this.tsdocTitle)
    //console.log("Title Value is:", f.value.docTitle)
    //console.log("Description Value is:", f.value.docDesc)
    // console.log("Url Value is:", f.value.docUrl)
    // console.log("Url Value is:", f.value.docUrl)
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }
}
