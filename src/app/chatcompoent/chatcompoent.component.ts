import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'chat-dialog',
  templateUrl: './chatcompoent.component.html',
  styleUrls: ['./chatcompoent.component.css']
})

export class ChatDialogComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  messages: Observable<Message[]>;
  // messages: Message[];
  formValue: string;
  
  constructor(public chat: ChatService) { }
  ngOnInit() {
    // appends to array after each new message is added to feedSource
    this.chat.greeting("Halo");
    this.messages = this.chat.conversation.asObservable()
        .scan((acc, val) => acc.concat(val));
    this.messages.subscribe(res=>
      {
        if(res.length>1)
          if(res[res.length-1].sentBy == "bot")
          {
            setTimeout(()=>{this.scrollToBottom()},500);
          }
      });
  }
  sendMessage() {
    if(this.formValue.length>0)
      this.chat.converse(this.formValue);
    this.formValue = '';
    setTimeout(()=>{this.scrollToBottom()},500);
  }

  scrollToBottom()
  {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }
}