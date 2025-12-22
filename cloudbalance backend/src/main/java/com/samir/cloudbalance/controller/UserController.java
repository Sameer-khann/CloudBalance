package com.samir.cloudbalance.controller;

import com.samir.cloudbalance.dto.UserRequestDto;
import com.samir.cloudbalance.dto.UserResponseDto;
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
    public List<UserResponseDto> getAllUser(){
        return UserService.allUsers();
    }

    @PostMapping
    public void addUser(@RequestBody UserRequestDto userRequestDto){
        UserService.addUser(userRequestDto);
    }

    @PutMapping
    public void updateUser(@RequestBody UserRequestDto userRequestDto){
//        System.out.println(user);
        UserService.updateUser(userRequestDto);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        UserService.deleteUser(id);
    }

}
