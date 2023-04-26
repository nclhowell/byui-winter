import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  document: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();

  constructor() {
    this.document = MOCKDOCUMENTS;
  }

  getDocuments() {
    return this.document.slice();
  }
  //  getDocument(id:string){
  //   // return this.documents.slice();
  //   console.log ("getDocument ID = ", id)
  // }
   getDocument(id: string): Document {
    for (let document of this.document) {
      if (document.id === id) {
     // console.log(document);
         return document;
       }
     }
   }
}
