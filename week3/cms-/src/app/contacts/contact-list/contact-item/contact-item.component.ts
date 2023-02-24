import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../contact.model'

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})

export class ContactItemComponent {
 @Input() contact: Contact;
 @Output() contactSelected = new EventEmitter<void>();
 onSelected() {
  this.contactSelected.emit();
}


}
// export class ContactItemComponent {
//   @Input() contacts: Contact[] = [
//     new Contact(1, "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771", "../../../assets/images/jacksonk.jpg", null),
//     new Contact(2, "Rex Barzeer", "barzeer@byui.edu", "208-496-3768", "../../../assets/images/barzeer.jpg", null),
//     new Contact(3, "Joe Shmo", "joe@byui.edu", "208-496-3700", "../../../assets/images/barzeer.jpg", null),
//     new Contact(4, "Joe Shmew", "joeshmew@byui.edu", "208-496-3701", "../../../assets/images/barzeer.jpg", null)
//   ]
//   contact: {id: number, name: string, email: string, phone: string, imagePath: string, group: []}
// }
