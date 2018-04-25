import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {ApiAiClient} from "api-ai-javascript";


@Injectable()
export class ChatService {
  readonly token = environment.dialogflow.angularBot;
  
  readonly client = new ApiAiClient({ accessToken: this.token });
  conversation = new BehaviorSubject<Message[]>([]);
  constructor(public http: HttpClient) {}
  // Sends and receives messages via DialogFlow
  converse(msg: string) {
    const userMessage = new Message(msg, 'user',new Date().toLocaleTimeString());
    this.update(userMessage);
    console.log("send");
    return this.client.textRequest(msg)
               .then(res => {
                  const speech = res.result.fulfillment.speech;
                  const botMessage = new Message(speech, 'bot',new Date().toLocaleTimeString());
                  setTimeout(()=>{this.update(botMessage)},2000);
               }).catch((error) => {console.log(error);});
  }

  handleError(serverError) {
    console.log(serverError);
  }

  greeting(msg:string)
  {
    console.log("send");
    this.client.textRequest(msg)
               .then(res => {
                  const speech = res.result.fulfillment.speech;
                  const botMessage = new Message(speech, 'bot',new Date().toLocaleTimeString());
                  this.update(botMessage)
               }).catch((error) => {console.log(error);});
  }

  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }
}

// Message class for displaying messages in the component
export class Message {
  constructor(public content: string, public sentBy: string, public time:string) {}
}