import { Component, OnInit } from '@angular/core';
import { Document } from './documents.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document;
  constructor(private documentService: DocumentService) { }
ngOnInit()
{
  this.documentService.documentSelectedEvent
  .subscribe(
    (document: Document) => {
      this.selectedDocument = document;
      console.log("This is the", document);
    }
  );
}
}


// export class DocumentsComponent {
//   selectedDocument: Document;
//   documents = [];


// }
