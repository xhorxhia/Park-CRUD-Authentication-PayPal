package com.PARK.controller;

import com.PARK.model.Role;
import com.PARK.model.User;
import com.PARK.repository.RoleRepository;
import com.PARK.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("auth")
public class UserController {

    @Autowired
    RoleRepository repository;

    @PostMapping("/addRole")
    public List<Role> addRole(@RequestBody Role role){

        repository.insert(role);
        return repository.findAll();
    }
}
