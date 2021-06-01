import { Component, OnInit } from '@angular/core';
import { WebSocketAPI } from 'src/WebSocketAPI';
import { Game } from '../models/Game';
import Swal from 'sweetalert2';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';
import { User } from '../models/User';



@Component({
  selector: 'app-game-home',
  templateUrl: './game-home.component.html',
  styleUrls: ['./game-home.component.css']
})

export class GameHomeComponent implements OnInit {
  gameDisplay: any = {};

  user!: User;
  isAdmin!:boolean


  websocketAPI: WebSocketAPI;
  authService!: AuthService;

  constructor(private Websocket: WebSocketAPI, private tokenStorage: TokenStorageService) {
    this.websocketAPI = Websocket;
    this.tokenStorage = tokenStorage;
    this.gameDisplay = this.websocketAPI.myGame.element;
    
  }


  ngOnInit() {

    this.sendToWebSocket();  // kur shtypet btn
    this.user=this.tokenStorage.getUser();
    if(this.user.roles[0]==="ADMIN"){  // kap nese esht admin apo jo, perdoret tek btn delete ne html
      this.isAdmin=true;
    }
    else{
      this.isAdmin=false;
    }
  }


  connectToWebSocket() {
    this.websocketAPI.connect();
  }

  resolveAfter2Seconds(x: any) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 1000);
    });
  }

  // displays all games
  sendToWebSocket() {  // subcsribes
    this.websocketAPI.onSend("/topic/showAll");
    this.gameDisplay = this.websocketAPI.myGame.element;
    console.log("helloooo  ", this.gameDisplay);
  }


  delete(id: String) {


    Swal.fire({
      title: 'Are you sure you want to delete it?',
      text: 'Your Action cannot be rollback.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think again'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Done!',
          'Game deleted.',
          'success'
        )
        this.websocketAPI.onSend(`/topic/delete/${id}`);   // delete
        this.gameDisplay = this.websocketAPI.myGame;

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Game NOT deleted)',
          'error'
        )
      }
    })

  }


}
