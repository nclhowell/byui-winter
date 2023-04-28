import { Component, OnInit } from '@angular/core';
import { Document } from './documents.model';
import { DocumentService } from './document.service';
import { WindRefService } from '../wind-ref.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  nativeWindow: any;
  selectedDocument: Document;
  constructor(private documentService: DocumentService,
    private windrefservice: WindRefService) {
    this.nativeWindow = this.windrefservice.getNativeWindow();
   }
ngOnInit()
{
  this.documentService.documentSelectedEvent
  .subscribe(
    (document: Document) => {
       this.selectedDocument = document;
       //  this.nativeWindow.open("/")
      // console.log("This is the", document);
    }
  );
}
}


// export class DocumentsComponent {
//   selectedDocument: Document;
//   documents = [];


// }
