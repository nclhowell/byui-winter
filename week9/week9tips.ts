You need to put return this.http.get<Document[]>("database url goes here").subscribe("rest of code goes here")

storeDocuments() {
    this.httpCient.put("https://myapy.com/documents.json", JSON.stringify(this.documents)
    , { headers: new HttpHeaders({"Content-Type" : "application/json"})}).subscribe(()=>
      this.documentListChangedEvent.next(this.documents.slice())
    )
   }


https://rxjs.dev/deprecations/subscribe-arguments

https://stackoverflow.com/questions/55472124/subscribe-is-deprecated-use-an-observer-instead-of-an-error-callback

To avoid the deprecation, you can add <Contact[]> in front of the Firebase url (before the bracket) and change the last part to:
this.contactListChangedEvent.next(this.contacts.slice());
(error: any) => {
console.log(error);
}
})
}

In the meantime here is my code where you can find the subscribe method is now expected to be called:

      .subscribe(
        {
          next: () => this.contactListChangedEvent.next(this.contacts.slice())
          , error: (e) => console.error('Error saving documents: ', e)
        }
      )

Hello Cindi, I think the problem is that you are assigning the documents and not the subscription in the document-list.component.ts. Try this for the ngOnInit method
this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    )
    this.documentService.getDocuments();

 If you are still facing issues with the data not showing up, please make sure that you have initialized the documents property with an empty array, as shown below:
// In the document-list.component.ts
documents: Document[] = []

We changing this.documents = this.documentService.getDocuments();

to just this.documentService.getDocuments(); 

This way the type issue is removed.
 ngOnInit() {
    this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent
    .subscribe((documentsList: Document[]) => {
      this.documents = documentsList;
    })
  }



In the contact-list.component.html file in the app-contact-item element (or the cms-contact-item) in the *ngFor statement right after the word contacts and before the let i = index you put the pipe. What comes before the pipe ( | ) is the data to be passed in, which is our contacts, and what comes after the ( | ) is the name of the pipe, which for me is "contactsFilter". Then with no spaces between you use a semi-colon and then the reference to the searchBox value. All together my app-contact-item looks like this:

 
<app-contact-item
    *ngFor="let contactEl of contacts | contactsFilter:searchBox.value; let i = index;"
    [contact]="contactEl"
    [index]="i"
    dnd-draggable [dragEnabled]="true" [dragData]="contactEl" [dropZones]="['contactGroup']"
    >
</app-contact-item>
I also recommend using this version of the transform from the instructions (the other didn't work for me)
transform(contacts: Contact[], term) { 
    let filteredArray: Contact[] =[];  
    for (let i=0; i<contacts.length; i++) {
       let contact = contacts[i];
       if (contact.name.toLowerCase().includes(term)) {
          filteredArray.push(contact);
       }
    }
    if (filteredArray.length < 1){
       return contacts;
    }
    return filteredArray;
   }

https://www.restapitutorial.com/lessons/httpmethods.html

Angela, you are right, the message and the contacts are connected to display the sender. 
I think you meant to paste the message-item code but posted the document-list instead.
I have this on my message-item.component:  
constructor(private contactService: ContactService) {}

 
ngOnInit(){
    let contact: Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name;
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      ()=>{
        contact = this.contactService.getContact(this.message.sender);
        this.messageSender = contact.name;
      }
    )
To anyone still stuck on why the messages component won't load with the correct names I offer an alternative solution to those that have already been offered. 

It is helpful to complete the Http Course Project in the video lessons. Specifically look at the video titled "Resolving Data Before Loading."

What I did was create a contacts resolver service to make sure the contact data is available when the messages route is loaded:
@Injectable({
providedIn: 'root'
})
export class ContactsResolverService implements Resolve<Contact[]> {
    constructor(private contactsService: ContactsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Contact[] | Observable<Contact[]> | Promise<Contact[]> {
    const contacts = this.contactsService.getContacts();
    return contacts
    }
}

Then I added the resolver to the messages route in the app routing module like this:
{ path: "messages", component: MessagesComponent, resolve: [ContactsResolverService] },


To anyone who is still having trouble with the parameters for the contacts filter pipe be sure not to use quotes around term ('term'). Using quotes turns term into a literal string. Since we want the value of term we can just pass the parameter like this: 
*ngFor="let contactElement of contacts | contactsFilter: term "

This will give us the value and not literally term. 

so, you can change your code to something like this:

      .subscribe(
        {
          next: (documents: Document[]) => {
               //your code here
           }
          , error: (e) => console.error(e)
        }
      )


document-list.component.ts needed to look like this: 
  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      )  
  }
