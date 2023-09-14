import {Injectable} from '@angular/core';
import {AnonymousSubject, Subject} from "rxjs/internal/Subject";
import {Message} from "../../models/models";
import {map, Observable, Observer} from "rxjs";

@Injectable({
  providedIn: 'root'
})


export class WebsocketService {

  CHAT_URL = "wss://socketsbay.com/wss/v2/1/demo/";

   subject!: AnonymousSubject<MessageEvent>;
   messages!: Subject<Message>;


  constructor() {
    // this.messages = <Subject<Message>>this.connect(this.CHAT_URL)
    //   .pipe(
    //     map((response: MessageEvent):Message => {
    //       console.log(response.data);
    //       return JSON.parse(response.data)
    //     })
    //   )
  }

  private connect(url : string):AnonymousSubject<MessageEvent>{
      if (!this.subject) {
          this.subject = this.create(url);
          console.log("Successfully connected: " + url);
      }
      return this.subject;
  }

  private create(url : string): AnonymousSubject<MessageEvent> {
      let ws = new WebSocket(url);
      let observable = new Observable((obs: Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);

        return ws.close.bind(ws);
      });
      let observer = {
          error: (err: any) => console.error(err),
          complete: () => undefined,
          next: (data: Object) => {
              console.log('Message sent to websocket: ', data);
              if (ws.readyState == WebSocket.OPEN){
                ws.send(JSON.stringify(data));
              }
          }
      };
      return new AnonymousSubject<MessageEvent>(observer,observable);
    }

    public connectTwo(url : string): Subject<MessageEvent>{
      if (!this.subject){
          this.subject = this.createTwo(url);
          console.log("Connected Successfully: "+ url);
      }
      return this.subject;
    }

    private createTwo(url : string): Subject<MessageEvent>{
      let ws = new WebSocket(url);

      let observable = new Observable((obs: Observer<MessageEvent>) => {
          ws.onmessage = obs.next.bind(obs);
          ws.onerror = obs.error.bind(obs);
          ws.onclose = obs.complete.bind(obs);

          return ws.close.bind(ws);
      });

      let observer = {
          error: (err: any) => console.error(err),
          complete: () => undefined,
          next : (data : Object) => {
              if (ws.readyState === WebSocket.OPEN){
                  ws.send(JSON.stringify(data));
              }
        }
      };
      return new AnonymousSubject<MessageEvent>(observer,observable);
    }
}

