package com.samir.cloudbalance.controller;

import com.samir.cloudbalance.model.UserEntity;
import com.samir.cloudbalance.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService UserService;

    @GetMapping
    public List<UserEntity> getAllUser(){
        return UserService.allUsers();
    }

    @PostMapping
    public void addUser(@RequestBody UserEntity userEntity){
        UserService.addUser(userEntity);
    }

    @PutMapping
    public void updateUser(@RequestBody UserEntity userEntity){
//        System.out.println(user);
        UserService.updateUser(userEntity);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        UserService.deleteUser(id);
    }

}
