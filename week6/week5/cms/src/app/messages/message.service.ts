import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

 @Injectable({
    providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  blah: string;
  messageSelectedEvent = new EventEmitter<Message>();
  messageChangedEvent = new EventEmitter<string>();
  messagesChangedEvent = new EventEmitter<Message[]>();


  constructor() {
    this.messages = MOCKMESSAGES;
    this.blah = "blah";
  }
  getMessages() {
    return this.messages.slice();
  }
  getMessage(id: string): Message {
    for (let message of this.messages) {
      if (message.id == id) {
     // console.log(message);
         return message;
       }
     }
   }
   addMessage(message: Message){
    // console.log (this.messages);
    this.messages.push(message);
   // this.messageChangedEvent.emit(this.messages.slice());
   // this.messageChangedEvent.emit;
     //console.log (this.messages.slice());
     this.messageChangedEvent.emit(this.blah)
     this.messagesChangedEvent.emit(this.messages.slice())
     // console.log (this.messages.slice());
  }
    addMessages(messages: Message) {
    // for (let message of messages) {
    //   this.addMessage(message);
    // }
    // this.messages.push(messages);
    // this.messagesChangedEvent.emit(this.messages.slice());
  }
}

