import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';
// import { ContactItem } from '../contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  @Output() contacts: Contact[] = [
    new Contact(1, "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771", "../../../assets/images/jacksonk.jpg", null),
    new Contact(2, "Rex Barzeer", "barzeer@byui.edu", "208-496-3768", "../../../assets/images/barzeer.jpg", null),
    new Contact(2, "Shmo Shmedley", "barzeer@byui.edu", "208-496-3768", "../../../assets/images/barzeer.jpg", null),
    new Contact(1, "Hoze Hozer", "jacksonk@byui.edu", "208-496-3771", "../../../assets/images/jacksonk.jpg", null)
  ]
//    new Contact('A Test Contact', 'Description of the Test Contact', 'https://img.freepik.com/free-psd/restaurant-vintage-badge-template-psd-set-remixed-from-public-domain-artworks_53876-141767.jpg?w=740&t=st=1675393339~exp=1675393939~hmac=1187a537ad4c56c4cca6d28b2954d7834f85d0b20a243e5e7ef69b60d7b9cfbe'),

}
