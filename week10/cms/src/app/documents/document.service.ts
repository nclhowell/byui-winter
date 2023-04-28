import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  fbURIdocuments: string = "https://wdd430cms0-default-rtdb.firebaseio.com/documents.json";
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>();
  documentListChanged = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private httpCient: HttpClient) {
    //this.documents = MOCKDOCUMENTS;
    this.documents = this.getDocuments();
    this.maxDocumentId = this.getMaxDocumentId();
  }

  getDocuments(): Document[] {

    this.httpCient.get<Document[]>(this.fbURIdocuments).subscribe(docs => {
      // console.log(docs);
      this.documents = docs;
      this.maxDocumentId = this.getMaxDocumentId();
	  // Alphabetical Sort
      this.documents.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      this.documentListChanged.next(this.documents.slice())
    });
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id == id) {
        //console.log("found!")
        return document;
      }
    }
    return null;
  }

  addDocument(newDocument: Document) {
    if (newDocument == undefined || newDocument == null) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument)
    //this.documentListChanged.next(this.getDocuments())
    this.storeDocuments();
  }
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument == null || originalDocument == null || originalDocument == undefined || originalDocument == undefined) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    //this.documentListChanged.next(this.getDocuments())
    this.storeDocuments();
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
    //this.documentChangedEvent.emit(this.documents.slice());
    //this.documentListChanged.next(this.getDocuments());
    this.storeDocuments();
  }

  getMaxDocumentId(): number {
    //return this.documents.sort(d=>d.id)[0];
    let maxId = 0
    for (const document of this.documents) {
      if (+document.id > maxId) {
        maxId = +document.id;
      }
    }
    return maxId;
  }

  storeDocuments() {
    this.httpCient.put(this.fbURIdocuments, JSON.stringify(this.documents)
      , { headers: new HttpHeaders({ "Content-Type": "application/json" }) })
      .subscribe(
        {
          next: () => this.documentListChanged.next(this.documents.slice())
          , error: (evar) => console.error('Error saving documents: ', evar)
        }
      )
  }
}
