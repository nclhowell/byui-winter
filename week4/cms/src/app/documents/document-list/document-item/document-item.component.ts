import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Document } from '../../documents.model'

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})

export class DocumentItemComponent {
 @Input() document: Document;
 @Output() documentSelected = new EventEmitter<void>();
 onSelected() {
  this.documentSelected.emit();
}


}
// export class DocumentItemComponent {
//   @Input() documents: Document[] = [
//     new Document(1, "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771", "../../../assets/images/jacksonk.jpg", null),
//     new Document(2, "Rex Barzeer", "barzeer@byui.edu", "208-496-3768", "../../../assets/images/barzeer.jpg", null),
//     new Document(3, "Joe Shmo", "joe@byui.edu", "208-496-3700", "../../../assets/images/barzeer.jpg", null),
//     new Document(4, "Joe Shmew", "joeshmew@byui.edu", "208-496-3701", "../../../assets/images/barzeer.jpg", null)
//   ]
//   document: {id: number, name: string, email: string, phone: string, imagePath: string, group: []}
// }
