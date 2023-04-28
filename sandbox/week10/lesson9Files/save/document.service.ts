import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
const apiUrl = "https://documentsproject-b2023-default-rtdb.firebaseio.com/documents.json";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  //documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private httpCient: HttpClient) {
    //this.documents = MOCKCONTACTS;
    this.documents = this.getDocuments();
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {

    this.httpCient.get<Document[]>(apiUrl).subscribe(docs => {
      //console.log(docs);
      this.documents = docs;
      this.maxDocumentId = this.getMaxId();
	  // sorting alphabeticall
      this.documents.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      this.documentListChangedEvent.next(this.documents.slice())
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
    //this.documentListChangedEvent.next(this.getDocuments())
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
    //this.documentListChangedEvent.next(this.getDocuments())
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
    //this.documentListChangedEvent.next(this.getDocuments());
    this.storeDocuments();
  }

  getMaxId(): number {
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
    this.httpCient.put(apiUrl, JSON.stringify(this.documents)
      , { headers: new HttpHeaders({ "Content-Type": "application/json" }) })
      .subscribe(
        {
          next: () => this.documentListChangedEvent.next(this.documents.slice())
          , error: (e) => console.error('Error saving documents: ', e)
        }
      )
  }
}
