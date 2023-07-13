import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  NgForm,
} from '@angular/forms';
import { DocumentService } from '../document.service';
import { Document } from '../documents.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css'],
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  newDocument: Document;
  value: Document;
  editMode: boolean = false;
  name: string = '';
  tsdocId = { id: 'enter id here' };
  tsdocName = { name: 'enter name here' };
  tsdocDesc = { description: 'enter description here' };
  tsdocUrl = { url: 'enter url here' };
  tdocId = { id: 'enter id here' };
  tdocName = 'enter name here';
  tdocDesc = 'enter description here';
  tdocUrl = 'enter url here';
  tsWhat = true;
  fid: string = "80";
  id: string;
  noid: string;
  strid: string;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      // console.log(params['id']);
      if (!params['id']) {
        this.editMode = false;
        return;
      }
      // grab document using current doc ID
      this.id = params['id'];
      this.originalDocument = this.documentService.getDocument(this.id);
  this.tdocName = this.originalDocument.name;
  this.tdocDesc = this.originalDocument.description;
  this.tdocUrl = this.originalDocument.url;

      if (!this.originalDocument) {
        return;
      }
      // this.document = this.originalDocument;
      // Parse this.document
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
      this.editMode = true;
      // console.log('Cloned Doc = ', this.document);
    });
  }

  onSubmit(f: NgForm) {
    // f.value.id = "80"; // Set blank formId
    console.log('Form Input = ', f.value);
    // this.document = (this.id, f.value.name, f.value.url)
    this.newDocument = (f.value)
    console.log("New Document from form", this.newDocument);
    if ((this.editMode == true)) {
      this.documentService.updateDocument(
        this.originalDocument,
        this.newDocument
      );
    } else {
      this.documentService.addDocument(this.newDocument);
    }

    this.router.navigate(['documents']);
    // console.log(f)
    // console.log(this.tsdocTitle)
    //console.log("Title Value is:", f.value.docTitle)
    //console.log("Description Value is:", f.value.docDesc)
    // console.log("Url Value is:", f.value.docUrl)
    // console.log("Url Value is:", f.value.docUrl)
  }

  onCancel() {
    this.router.navigate(['documents']);
  }
}
