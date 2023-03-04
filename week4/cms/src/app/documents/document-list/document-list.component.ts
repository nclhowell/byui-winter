import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../documents.model';
// import { DocumentItem } from '../document';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
    @Output() documentWasSelected = new EventEmitter<Document>();
    documents: Document[] = [
    new Document(1, "CSE541-Web Disassembly", "CSE541 Description", "../../../assets/images/jacksonk.jpg",[]),
    new Document(2, "CSE659-Web Reassembly", "CSE659 Description", "../../../assets/images/jacksonk.jpg",[]),
    new Document(3, "CSE774-Web Dissection", "CSE774 Description", "../../../assets/images/jacksonk.jpg",[]),
    new Document(1, "CSE983-Web Rotation", "CSE983 Description", "../../../assets/images/jacksonk.jpg",[]),
  ];

onDocumentSelected(document: Document) {
   this.documentWasSelected.emit(document);
  }

}
