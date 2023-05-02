import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  fbURImessages: string = "https://wdd430cms0-default-rtdb.firebaseio.com/messages.json";
  messages: Message[] = [];
  messageSelectedEvent = new EventEmitter<Message>();
  // messageChangedEvent = new EventEmitter<Message[]>();
  messageListChanged = new Subject<Message[]>();
  maxMessageId: number;

  constructor(private httpCient: HttpClient) {
    //this.messages = MOCKMESSAGES;
    this.messages = this.getMessages();
    this.maxMessageId = this.getMaxMessageId();
  }

  getMessages(): Message[] {

    this.httpCient.get<Message[]>(this.fbURImessages).subscribe(docs => {
      // console.log(docs);
      this.messages = docs;
      this.maxMessageId = this.getMaxMessageId();
	  // Alphabetical Sort
      // this.messages.sort((a, b) => {
      //   if (a.name < b.name) {
      //     return -1;
      //   }
      //   if (a.name > b.name) {
      //     return 1;
      //   }
      //   return 0;
      // });
      this.messageListChanged.next(this.messages.slice())
    });
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    for (const message of this.messages) {
      if (message.id == id) {
        console.log("message ID = ", id)
        return message;
      }
    }
    return null;
  }

  addMessage(newMessage: Message) {
    if (newMessage == undefined || newMessage == null) {
      return;
    }

    this.maxMessageId++;
    newMessage.id = String(this.maxMessageId);
    this.messages.push(newMessage)
    //this.messageListChanged.next(this.getMessages())
    this.storeMessages();
  }
  updateMessage(originalMessage: Message, newMessage: Message) {
    if (originalMessage == null || originalMessage == null || originalMessage == undefined || originalMessage == undefined) {
      return;
    }

    const pos = this.messages.indexOf(originalMessage);
    if (pos < 0) {
      return;
    }

    newMessage.id = originalMessage.id;
    this.messages[pos] = newMessage;
    //this.messageListChanged.next(this.getMessages())
    this.storeMessages();
  }

  deleteMessage(message: Message) {
    if (!message) {
      return;
    }
    const pos = this.messages.indexOf(message);
    if (pos < 0) {
      return;
    }
    this.messages.splice(pos, 1);
    //this.messageChangedEvent.emit(this.messages.slice());
    //this.messageListChanged.next(this.getMessages());
    this.storeMessages();
  }

  getMaxMessageId(): number {
    //return this.messages.sort(d=>d.id)[0];
    let maxId = 0
    for (const message of this.messages) {
      if (+message.id > maxId) {
        maxId = +message.id;
      }
    }
    return maxId;
  }

  storeMessages() {
    this.httpCient.put(this.fbURImessages, JSON.stringify(this.messages)
      , { headers: new HttpHeaders({ "Content-Type": "application/json" }) })
      .subscribe(
        {
          next: () => this.messageListChanged.next(this.messages.slice())
          , error: (evar) => console.error('Error saving messages: ', evar)
        }
      )
  }
}
