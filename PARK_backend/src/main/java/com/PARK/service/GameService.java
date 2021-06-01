package com.PARK.service;

import com.PARK.model.Game;
import com.PARK.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    @Autowired
    GameRepository repository;


    public List<Game> insertToDb(Game game){
        repository.insert(game);
        return repository.findAll();
    }

    public List<Game> getAll(){
        return repository.findAll();
    }

    public List<Game> delete(String id){
        repository.deleteById(id);
        return repository.findAll();
    }
}
