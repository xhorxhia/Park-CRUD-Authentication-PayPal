package com.PARK.controller;

import com.PARK.model.Game;
import com.PARK.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController

public class GameController {

    @Autowired
    private GameService service;


     @MessageMapping("/showAll")
     @SendTo("/topic/games/get")
     public List<Game> getGames(){
        return service.getAll();
    }


    @MessageMapping("/add")
    @SendTo("/topic/games/get")
    public List<Game> addGame(@Payload Game game){
        return service.insertToDb(game);
    }

    @MessageMapping("/delete/{id}")
    @SendTo("/topic/games/get")
    public List<Game> deleteGame(@DestinationVariable String id){

        return service.delete(id);
    }


}