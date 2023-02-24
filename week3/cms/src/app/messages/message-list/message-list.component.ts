import { Component, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';
@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
    @Output() messageWasSelected = new EventEmitter<Message>();
    messages: Message[] = [
    new Message(1, "Why Me?", "Please text me back, Jack", "Joe Shmo"),
    new Message(2, "Who Dat?", "Why is Angular so Spangular", "Harriet Hinson"),
    new Message(3, "Comon Man!", "Too much work for a 3 unit course", "Dan the Man"),
    new Message(4, "Whazzup?", "What happended to CSS HTML and JS?", "Who Yang"),
    new Message(5, "Hellow from Harry Howser", "Help me finish this cours!", "One Fun Guy")
  ];

onMessageSelected(message: Message) {
   this.messageWasSelected.emit(message);
  }

}
