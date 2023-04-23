import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: Document[] = [];
  documentListClone: Document[] = [];
  maxid = 0;
  maxDocumentId: number;

  // Observables
  DocumentListChanged = new Subject<Document[]>();

  // Event Emitters
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxDocumentId();
  }

  getDocuments() {
    return this.documents.slice();
  }


  getMaxDocumentId() {
    let maxId = 0;
    let currentId = 0;
    for (let document of this.documents) {
      currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    //console.log(maxId);
    return maxId;
  }

  addDocument(newdocument: Document) {
    if (!newdocument) {
      return;
    }
    this.maxDocumentId++;
    newdocument.id = this.maxDocumentId.toString();
    this.documents.push(newdocument);
    this.documentListClone = this.documents.slice();
    this.DocumentListChanged.next(this.documentListClone);
  }

  updateDocument(document: Document, newDocument: Document) {
    console.log("Edit Mode True: Original Document", document);

    if (!document || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    newDocument.id = document.id;
    console.log("Edit Mode True: New Document derived from form", newDocument);
    document[pos] = newDocument;
    console.log("Edit Mode True: New Document Position", document[pos]);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documents.push(newDocument);

    this.documentListClone = this.documents.slice();
    console.log (this.documents.slice())
    this.DocumentListChanged.next(this.documentListClone);
  }

  getDocument(id: string): Document {
    for (let document of this.documents) {
      if (document.id === id) {
       // console.log(document);
        return document;
      }
    }
  }
  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentListClone = this.documents.slice();
    this.DocumentListChanged.next(this.documentListClone);
  }

}
