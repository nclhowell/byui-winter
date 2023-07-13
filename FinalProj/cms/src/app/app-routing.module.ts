import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { BikesComponent } from './bikes/bikes.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { BikeDetailComponent } from './bikes/bike-detail/bike-detail.component';
import { BikeListComponent } from './bikes/bike-list/bike-list.component'
import { BikeEditComponent } from './bikes/bike-edit/bike-edit.component'

const appRoutes: Routes = [
// Document Routes
 { path: '', redirectTo: '/bikes', pathMatch: 'full' },
  { path: 'documents', component: DocumentsComponent, children: [
    { path: '', component: DocumentListComponent },
    { path: 'new', component: DocumentEditComponent },
    { path: ':id', component: DocumentDetailComponent },
    { path: ':id/edit', component: DocumentEditComponent },
  ] },
// Message Routes
  { path: 'messages', component: MessageListComponent},
// Bike Routes
  { path: 'bikes', component: BikesComponent, children: [
  { path: '', component: BikeListComponent },
  { path: 'new', component: BikeEditComponent },
// { path: 'new', component: BikeEditComponent },
{ path: ':id', component: BikeDetailComponent },
{ path: ':id/edit', component: BikeEditComponent },
  ]
},
{ path: 'bikes', component: BikeListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
