import { Component, Input } from '@angular/core';
import { Document } from '../documents.model';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent {
    @Input() document: Document;

}
// export class DocumentListComponent {
//   document: Document[] = [
//     new Document(1, "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771", "../../../assets/images/jacksonk.jpg", null),
//     new Document(2, "Rex Barzeer", "barzeer@byui.edu", "208-496-3768", "../../../assets/images/barzeer.jpg", null)
//   ]
// }
