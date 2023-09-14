import {Subject} from "rxjs/internal/Subject";
import {WebsocketService} from "./websocket.service";
import {Injectable} from "@angular/core";
import {map} from "rxjs";

const CHAT_URL = "ws://echo.websocket.org";

export interface Message {
  author: string;
  message: string;

}
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public messages: Subject<Message> | undefined;

  constructor(private wsService: WebsocketService) {
    // this.messages = <Subject<Message>>wsService.connectTwo(CHAT_URL)
    //     .pipe(
    //         map(
    //             (response: MessageEvent): Message => {
    //               let data = JSON.parse(response.data);
    //               return {
    //                 author: data.author,
    //                 message: data.message
    //               };
    //             }
    //         )
    //     );
  }

}
