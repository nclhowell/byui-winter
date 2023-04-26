import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Document } from '../../documents.model';
import { DocumentService } from '../../document.service';
@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css'],
})

export class DocumentItemComponent {
  @Input() document: Document;
  constructor (private documentService: DocumentService) {}
  ngOnInit(){
  }
  onSelected() {
    this.documentService.documentSelectedEvent.emit(this.document);

   // console.log(this.documentService.getDocument("4"))
  // this.documentService.getDocument("2")
 }
 }


// export class DocumentItemComponent {
//   @Input() document: Document;
//   @Output() documentSelected = new EventEmitter<void>();
//   onSelected() {
//     this.documentSelected.emit();
//   }
// }
