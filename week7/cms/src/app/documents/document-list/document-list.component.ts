import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Document } from '../documents.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit{
  documents: Document[];
  DocumentListChangedSubscription: Subscription;


  constructor(private documentService: DocumentService) {}
 ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.DocumentListChangedSubscription = this.documentService.DocumentListChanged
      .subscribe(
        (document: Document[]) => {
          this.documents = document;
        }
      );
  }

  ngOnDestroy(): void {
    this.DocumentListChangedSubscription.unsubscribe();
  }


}
  // ngOnInit() {
  //   this.documents = this.documentService.getDocuments();
  //   this.documentService.documentChangedEvent
  //   .subscribe(
  //     refreshdocs => {
  //     this.documents =  this.documentService.getDocuments();
  //     }
  //   );
  // }
