package com.samir.cloudbalance.controller;

import com.samir.cloudbalance.model.User;
import com.samir.cloudbalance.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserContoller {

    @Autowired
    UserService service;

    @GetMapping("/alluser")
    public List<User> getAllUser(){
        return service.allUsers();
    }

    @PostMapping
    public void addUser(@RequestBody User user){
        service.addUser(user);
    }

}
