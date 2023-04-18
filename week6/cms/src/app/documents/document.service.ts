import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  document: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document>();
  constructor() {
    this.document = MOCKDOCUMENTS;
  };

  getDocuments() {
    return this.document.slice();
  };

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.document.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.document.splice(pos, 1);
    this.documentChangedEvent.emit(document);
 };


   getDocument(id: string): Document {
    for (let document of this.document) {
      if (document.id === id) {
      console.log(document);
         return document;
       }
     }
   }
}
