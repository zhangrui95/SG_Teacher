import {Injectable} from '@angular/core'
import {QueueingSubject} from 'queueing-subject'
import {Observable} from 'rxjs/Observable'
import websocketConnect from 'rxjs-websockets'
import 'rxjs/add/operator/share'
import {UserData} from "./user-data";
import "rxjs/add/operator/delay";

@Injectable()
export class ServerSocket {
  private inputStream: QueueingSubject<string>
  public messages: Observable<string>

  constructor(private userData: UserData) {

  }

  public connect() {

    if(this.messages){
      return
    }
    // Using share() causes a single websocket to be created when the first
    // observer subscribes. This socket is shared with subsequent observers
    // and closed when the observer count falls to zero.
    if (this.userData.userToken) {
      this.messages = websocketConnect(
        'ws://139.196.189.173:8089/VisualizationMgt/websocket.do?token=' + this.userData.userToken + "&type=pad",
        this.inputStream =
          new QueueingSubject<string>()
      ).messages.share()

    }

  }

  public send(message: string): void {
    if( this.inputStream){
      this.inputStream.next(message)
    }
    // If the websocket is not connected then the QueueingSubject will ensure
    // that messages are queued and delivered when the websocket reconnects.
    // A regular Subject can be used to discard messages sent when the websocket
    // is disconnected.

  }
}
