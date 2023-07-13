import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { json } from 'body-parser';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // mongoURIdocsArray: string = "https://wdd430cms0-default-rtdb.firebaseio.com/messages.json";
  mongoURIdocsArray: string = 'http://localhost:3000/messages';
 // jsondocs: Message[] = [];
 messages: Message[] = [];
 //  docsArray: Message[] = MOCKMESSAGES;
  messageSelectedEvent = new EventEmitter<Message>();
  messageChangedEvent = new EventEmitter<Message[]>();
  messageListChanged = new Subject<Message[]>();
  maxMessageId: number;
  laynesId: string;

  constructor(private httpClient: HttpClient) {};
  // this.docsArray = MOCKMESSAGES;
 // this.docsArray = this.getMessages();
// }
// OnInit () {
//   this.getMessages()
// }
//   // console.log('Constructor mongoDocs =', this.docsArray);
  //  this.jsondocs = this.getMessages();
  // this.docsArray = this.getMessages();


   // console.log('mockDocs = ', this.docsArray);
   // console.log("Web Docs Array = ", this.webdocsArray);
   // this.maxMessageId = this.getMaxMessageId();
   // console.log("Max Doc ID =", this.maxMessageId);

  // getMessages() {
  //   this.httpClient
  //     .get<{ message: string; docsArray: Message[] }>(this.mongoURIdocsArray)
  //     .subscribe((docsArrayData) => {
  //       console.log('It works!');
  //       this.docsArray = docsArrayData.docsArray;
  //       response.status(200).json({
  //         message: 'Docs fetched successfully'
  //          docsArray: docsArray });
  //       });

        //sortAndSend() {
        // this.docsArray.sort((a, b) => {
        //   if (a.sender < b.sender) {
        //     return -1;
        //   }
        //   if (a.sender > b.sender) {
        //     return 1;
        //   }
        //   return 0;
        // });
  //       this.messageListChanged.next(this.docsArray.slice());
  //     });
  // }

  getMessages() {
    this.httpClient
      .get<{message: string, messages: Message[]}>(this.mongoURIdocsArray)
      // .get<Message[]>(this.mongoURIdocsArray)
      .subscribe((docs) => {
       this.messages = docs.messages;
       //console.log("getDocuuments mongoDocs =", this.docsArray.slice());
       //  this.maxMessageId = this.getMaxMessageId();
       // Alphabetical Sort
        this.messages.sort((a, b) => {
          if (a.sender < b.sender) {
            return -1;
          }
          if (a.sender > b.sender) {
            return 1;
          }
          return 0;
        });
        // console.log("Returned:", this.docsArray);
       // console.log(this.messages);
        // this.messageListChanged.next(this.messages.slice());
        this.messageListChanged.next(this.messages);
      });
     // console.log(this.docsArray.slice());
     // console.log("Returned Slice:", this.docsArray);
     return this.messages.slice();
  }

  getMessage(id: string): Message {
    for (const message of this.messages) {
      if (message.id == id) {
       console.log(id)
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message) {
    // console.log(message)
    this.laynesId = "101";
    message.id = "101" ;
    if (!message) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
     message.id = "101";
    this.httpClient
      .post<{ messages: string; message: Message }>(
        'http://localhost:3000/messages',
        message,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new message to msgArray
        console.log(responseData.message);
        responseData.message.id = "101";
        this.messages.push(responseData.message);
        responseData.message.id = "101";
        this.sortAndSend();
        responseData.message.id = "101";
      });
  }

  // addMessage(newMessage: Message) {
  //   if (newMessage == undefined || newMessage == null) {
  //     return;
  //   }

  //   this.maxMessageId++;
  //   newMessage.id = String(this.maxMessageId);
  //   this.docsArray.push(newMessage)
  //   this.storeMessages();
  // }

  // updateMessage(originalMessage: Message, newMessage: Message) {
  //   if (originalMessage == null || originalMessage == null || originalMessage == undefined || originalMessage == undefined) {
  //     return;
  //   }

  //   const pos = this.docsArray.indexOf(originalMessage);
  //   if (pos < 0) {
  //     return;
  //   }

  //   newMessage.id = originalMessage.id;
  //   this.docsArray[pos] = newMessage;
  //   this.storeMessages();
  // }

  // updateMessage(originalMessage: Message, newMessage: Message) {
  //   if (!originalMessage || !newMessage) {
  //     return;
  //   }

  //   const pos = this.messages.findIndex((d) => d.id === originalMessage.id);

  //   if (pos < 0) {
  //     return;
  //   }

  //   // set the id of the new Message to the id of the old Message
  //   newMessage.id = originalMessage.id;
  //   // newMessage._id = originalMessage._id;

  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //   // update database
  //   this.httpClient
  //     .put(
  //       'http://localhost:3000/messages/' + originalMessage.id,
  //       newMessage,
  //       { headers: headers }
  //     )
  //     .subscribe((response: Response) => {
  //       this.messages[pos] = newMessage;
  //       this.sortAndSend();
  //     });
  // }

  // deleteMessage(message: Message) {
  //   if (!message) {
  //     return;
  //   }
  //   const pos = this.docsArray.indexOf(message);
  //   if (pos < 0) {
  //     return;
  //   }
  //   this.docsArray.splice(pos, 1);
  //   this.storeMessages();
  // }

  deleteMessage(message: Message) {
    if (!message) {
      return;
    }

    const pos = this.messages.findIndex((d) => d.id === message.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.httpClient
      .delete('http://localhost:3000/messages/' + message.id)
      .subscribe((response: Response) => {
        this.messages.splice(pos, 1);
        this.sortAndSend();
      });
  }

  getMaxMessageId(): number {
    //return this.docsArray.sort(d=>d.id)[0];
    let maxId = 0;
    for (const message of this.messages) {
      if (+message.id > maxId) {
        maxId = +message.id;
      }
    }
    return maxId;
  }

  storeMessages() {
    this.httpClient
      .put(this.mongoURIdocsArray, JSON.stringify(this.messages), {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe({
        next: () => this.messageListChanged.next(this.messages.slice()),
        error: (evar) => console.error('Error saving docsArray: ', evar),
      });
  }

  sortAndSend() {
    this.messages.sort((a, b) => {
      if (a.sender < b.sender) {
        return -1;
      }
      if (a.sender > b.sender) {
        return 1;
      }
      return 0;
    });
    // console.log(this.messages.slice);
    this.messageListChanged.next(this.messages);
  }
}
