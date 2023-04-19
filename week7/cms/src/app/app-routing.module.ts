import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component'
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component'

const appRoutes: Routes = [
// Message Routes
 { path: '', redirectTo: '/documents', pathMatch: 'full' },
  { path: 'documents', component: DocumentsComponent, children: [
    { path: '', component: DocumentListComponent },
    { path: 'new', component: DocumentEditComponent },
    { path: ':id', component: DocumentDetailComponent },
    { path: ':id/edit', component: DocumentEditComponent },
  ] },
  { path: 'messages', component: MessageListComponent},
// Contact Routes
  { path: 'contacts', component: ContactsComponent, children: [
  { path: '', component: ContactListComponent },
  { path: 'new', component: ContactEditComponent },
// { path: 'new', component: ContactEditComponent },
{ path: ':id', component: ContactDetailComponent },
{ path: ':id/edit', component: ContactEditComponent },
  ]
},
{ path: 'contacts', component: ContactListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
