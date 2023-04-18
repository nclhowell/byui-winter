import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Document } from '../documents.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit{
  documents: Document[];

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChangedEvent
    .subscribe(
      refreshdocs => {
      this.documents =  this.documentService.getDocuments();
      }
    );
  }

  // onSelected(document: Document) {
  //   this.documentService.documentSelectedEvent.emit(document);
  //   console.log(document);
  // }
}

// export class DocumentListComponent {
//     @Output() documentWasSelected = new EventEmitter<Document>();
//     documents: Document[] = []

// onDocumentSelected(document: Document) {
//    this.documentWasSelected.emit(document);
//   }

// }
