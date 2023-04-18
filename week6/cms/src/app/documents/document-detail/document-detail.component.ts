import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../documents.model';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit{
    id: string;
    strid: string;
    document: Document;
    nativeWindow: any;

  constructor(private windrefservice: WindRefService,
              private documentService: DocumentService,
              private route: ActivatedRoute,
              private router: Router) {
              this.nativeWindow = this.windrefservice.getNativeWindow();
  }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        // this.id = "48";
        // console.log(this.id);
        this.document = this.documentService.getDocument(this.id);
      }
    );
  }


  onView() {
    if (this.document.url){
      this.nativeWindow.open(this.document.url);
    }
  }

onDelete() {
   this.documentService.deleteDocument(this.document);
   // this.nativeWindow.open("/documents");
   //route back to the '/documents' URL
}

}
// export class DocumentListComponent {
//   document: Document[] = [
//     new Document(1, "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771", "../../../assets/images/jacksonk.jpg", null),
//     new Document(2, "Rex Barzeer", "barzeer@byui.edu", "208-496-3768", "../../../assets/images/barzeer.jpg", null)
//   ]
// }
