import { Component, OnInit, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
// import { MessageItem } from '../message';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[];
  blahstring: string;

  constructor(private msgService: MessageService) {}

  ngOnInit() {
    this.messages = this.msgService.getMessages();
    // Debug section to test emitter
    // this.msgService.messageChangedEvent.subscribe((blahstring: string) => {
    //   this.blahstring = blahstring;
    //   console.log(this.blahstring);
    //   console.log(this.messages);
    // });

    this.msgService.messagesChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
      console.log(this.messages);
    });
  }
}

//onSelected(message: Message) {
// this.messageService.messageSelectedEvent.emit(message);
//}

// onMessageAdded(message: Message) {
// console.log("Message about to be pushed")
//this.messages = this.messageService.messages;
// }

// import { Component, EventEmitter, Output } from '@angular/core';
// import { Message } from '../message.model';
// @Component({
//   selector: 'app-message-list',
//   templateUrl: './message-list.component.html',
//   styleUrls: ['./message-list.component.css']
// })
// export class MessageListComponent {
//     // @Output() messageWasSelected = new EventEmitter<Message>();
//     messages: Message[] = [
//     new Message("1", "Why Me?", "Please text me back, Jack", "Joe Shmo"),
//     new Message("2", "Who Dat?", "Why is Angular so Spangular", "Harriet Hinson"),
//     new Message("3", "Comon Man!", "Too much work for a 3 unit course", "Dan the Man"),
//     new Message("4", "Whazzup?", "What happended to CSS HTML and JS?", "Who Yang"),
//     new Message("5", "Hellow from Harry Howser", "Help me finish this course!", "One Fun Guy")
//   ];

//   ngOnInit() {
//     console.log("Hello message-list")
//   }

// // onMessageSelected(message: Message) {
// // this.onMessageSelected.emit(message);
// //  }

//  onMessageAdded(message: Message) {
//   console.log("Message about to be pushed")
//     this.messages.push(message);
//   }
// }
