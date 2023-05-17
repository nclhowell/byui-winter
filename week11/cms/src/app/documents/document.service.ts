import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { json } from 'body-parser';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  // mongoURIdocsArray: string = "https://wdd430cms0-default-rtdb.firebaseio.com/documents.json";
  mongoURIdocsArray: string = 'http://localhost:3000/documents';
 // jsondocs: Document[] = [];
 docsArray: Document[] = [];
 //  docsArray: Document[] = MOCKDOCUMENTS;
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChanged = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private httpClient: HttpClient) {
  // this.docsArray = MOCKDOCUMENTS;
 // this.docsArray = this.getDocuments();
}
  // console.log('Constructor mongoDocs =', this.docsArray);
  //  this.jsondocs = this.getDocuments();
  // this.docsArray = this.getDocuments();


   // console.log('mockDocs = ', this.docsArray);
   // console.log("Web Docs Array = ", this.webdocsArray);
   // this.maxDocumentId = this.getMaxDocumentId();
   // console.log("Max Doc ID =", this.maxDocumentId);

  // getDocuments() {
  //   this.httpClient
  //     .get<{ message: string; docsArray: Document[] }>(this.mongoURIdocsArray)
  //     .subscribe((docsArrayData) => {
  //       console.log('It works!');
  //       this.docsArray = docsArrayData.docsArray;
  //       response.status(200).json({
  //         message: 'Docs fetched successfully'
  //          docsArray: docsArray });
  //       });

        //sortAndSend() {
        // this.docsArray.sort((a, b) => {
        //   if (a.name < b.name) {
        //     return -1;
        //   }
        //   if (a.name > b.name) {
        //     return 1;
        //   }
        //   return 0;
        // });
  //       this.documentListChanged.next(this.docsArray.slice());
  //     });
  // }

  getDocuments() {
    this.httpClient
      .get<{message: string, documents: Document[]}>(this.mongoURIdocsArray)
      // .get<Document[]>(this.mongoURIdocsArray)
      .subscribe((docs) => {
       this.docsArray = docs.documents;
       //console.log("getDocuuments mongoDocs =", this.docsArray.slice());
         this.maxDocumentId = this.getMaxDocumentId();
       // Alphabetical Sort
        this.docsArray.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        // console.log("Returned:", this.docsArray);
        console.log(this.docsArray);
        this.documentListChanged.next(this.docsArray.slice());
      });
     // console.log(this.docsArray.slice());
     // console.log("Returned Slice:", this.docsArray);
     return this.docsArray.slice();
  }

  getDocument(id: string): Document {
    for (const document of this.docsArray) {
      if (document.id == id) {
        //console.log("found!")
        return document;
      }
    }
    return null;
  }
  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.httpClient
      .post<{ message: string; document: Document }>(
        'http://localhost:3000/docsArray',
        document,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new document to docsArray
        this.docsArray.push(responseData.document);
        this.sortAndSend();
      });
  }

  // addDocument(newDocument: Document) {
  //   if (newDocument == undefined || newDocument == null) {
  //     return;
  //   }

  //   this.maxDocumentId++;
  //   newDocument.id = String(this.maxDocumentId);
  //   this.docsArray.push(newDocument)
  //   this.storeDocuments();
  // }

  // updateDocument(originalDocument: Document, newDocument: Document) {
  //   if (originalDocument == null || originalDocument == null || originalDocument == undefined || originalDocument == undefined) {
  //     return;
  //   }

  //   const pos = this.docsArray.indexOf(originalDocument);
  //   if (pos < 0) {
  //     return;
  //   }

  //   newDocument.id = originalDocument.id;
  //   this.docsArray[pos] = newDocument;
  //   this.storeDocuments();
  // }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.docsArray.findIndex((d) => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    // newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.httpClient
      .put(
        'http://localhost:3000/docsArray/' + originalDocument.id,
        newDocument,
        { headers: headers }
      )
      .subscribe((response: Response) => {
        this.docsArray[pos] = newDocument;
        this.sortAndSend();
      });
  }

  // deleteDocument(document: Document) {
  //   if (!document) {
  //     return;
  //   }
  //   const pos = this.docsArray.indexOf(document);
  //   if (pos < 0) {
  //     return;
  //   }
  //   this.docsArray.splice(pos, 1);
  //   this.storeDocuments();
  // }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.docsArray.findIndex((d) => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.httpClient
      .delete('http://localhost:3000/docsArray/' + document.id)
      .subscribe((response: Response) => {
        this.docsArray.splice(pos, 1);
        this.sortAndSend();
      });
  }

  getMaxDocumentId(): number {
    //return this.docsArray.sort(d=>d.id)[0];
    let maxId = 0;
    for (const document of this.docsArray) {
      if (+document.id > maxId) {
        maxId = +document.id;
      }
    }
    return maxId;
  }

  storeDocuments() {
    this.httpClient
      .put(this.mongoURIdocsArray, JSON.stringify(this.docsArray), {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe({
        next: () => this.documentListChanged.next(this.docsArray.slice()),
        error: (evar) => console.error('Error saving docsArray: ', evar),
      });
  }

  sortAndSend() {
    this.docsArray.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.documentListChanged.next(this.docsArray.slice());
  }
}
