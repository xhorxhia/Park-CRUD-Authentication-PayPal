import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WebSocketAPI } from 'src/WebSocketAPI';
import { Game } from '../models/Game';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})

export class BoardAdminComponent implements OnInit {
  content = '';

  webSocketAPI: WebSocketAPI;
  myGame!: Game;               // "!" shows that  the variable will be defined at run-time
  addGameForm!: FormGroup;
  
  constructor(private fb: FormBuilder, private websocketAPI: WebSocketAPI) {
    this.webSocketAPI = websocketAPI;
  }

  ngOnInit(): void {  // subscibes the admin when page loads

   this.addGameForm = this.fb.group({
    name: [''],
    description: [''],
    price: ['']    
  });

 }

 get name(){
  return this.addGameForm.get('name');
}

get description(){
  return this.addGameForm.get('description');
}

get price(){
  return this.addGameForm.get('price');
}
 
  connectToWebsocket() {
    this.webSocketAPI.connect();
  }

  
  // saves new game
  saveGame() {
    this.myGame = this.addGameForm.value;
   this.webSocketAPI.onSendSave("/topic/add", this.myGame);
 }

 

}
