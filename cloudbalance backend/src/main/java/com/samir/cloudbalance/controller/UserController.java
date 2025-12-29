package com.samir.cloudbalance.controller;

import com.samir.cloudbalance.dto.UserRequestDto;
import com.samir.cloudbalance.dto.UserResponseDto;
import com.samir.cloudbalance.model.UserEntity;
import com.samir.cloudbalance.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService UserService;

//    @PreAuthorize("hasAnyRole('Admin','Customer')")
//    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public List<UserResponseDto> getAllUser(){
        return UserService.allUsers();
    }


    @PreAuthorize("hasRole('Admin')")
    @PostMapping
    public void addUser(@RequestBody UserRequestDto userRequestDto){
        UserService.addUser(userRequestDto);
    }


    @PreAuthorize("hasRole('Admin')")
    @PutMapping
    public void updateUser(@RequestBody UserRequestDto userRequestDto){
//        System.out.println(user);
        UserService.updateUser(userRequestDto);
    }

    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        UserService.deleteUser(id);
    }

}
