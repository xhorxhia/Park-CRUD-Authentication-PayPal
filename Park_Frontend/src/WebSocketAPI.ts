import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Game } from './app/models/Game';
import { Server } from 'node:http';

export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8080/ws';  // endPoint created in spring consumer
    topic: string = "/topic/games/get"; // sic eshte te funxioni SendTo ne backend

    stompClient: any;      
    myGame: any={}; // object qe mban brenda obj element. element mban brenda te gjitha games
  
   public ws: any;


   
    // connect method, gets all the appliances
    connect() {
        console.log("Getting Games");
        this.ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(this.ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame:any) {
            _this.stompClient.subscribe(_this.topic, function (message:any) {
                _this.onMessageReceived(message);
            });
        }, this.errorCallBack);
    }

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error:any) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this.connect();
        }, 5000);
    }

    resolveAfter2Seconds(x: any) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, 2500);
        });
    }

    /**
     * Send message to sever via web socket
     * @param {*} message 
     */


    // con te dhenat ne server nepermjet websocket
    // drg nje msg ne backend
    onSend(destination: String) {
        this.connect();
        this.resolveAfter2Seconds(20).then(() => {
            this.stompClient.send(destination, {}, "Message sent!");
        });
    }

     // to save the new game
    onSendSave(destination: String, game: Game) { 
        this.connect();
        this.resolveAfter2Seconds(20).then(() => {
            this.stompClient.send(destination, {}, JSON.stringify(game)); // converts to JSON string
        });
    }


    //therritet kur eshte marre nje msg nga serveri
    onMessageReceived(message: any) {
        this.myGame.element = (JSON.parse(message.body));   // element eshte brenda obj myGame qe mban listen games(game-home)
    }
}