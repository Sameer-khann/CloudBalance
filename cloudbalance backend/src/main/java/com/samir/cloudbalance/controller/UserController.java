package com.samir.cloudbalance.controller;

import com.samir.cloudbalance.dto.UserRequestDto;
import com.samir.cloudbalance.dto.UserResponseDto;
import com.samir.cloudbalance.dto.UserUpdateRequestDto;
import com.samir.cloudbalance.model.UserEntity;
import com.samir.cloudbalance.services.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService UserService;


    @PreAuthorize("hasAnyRole('Admin','ReadOnly')")
    @GetMapping
    public List<UserResponseDto> getAllUser(){

        return UserService.allUsers();
    }

    @PreAuthorize("hasRole('Admin')")
    @PostMapping
    public void addUser(@Valid @RequestBody UserRequestDto userRequestDto){
        UserService.addUser(userRequestDto);
    }

    @PreAuthorize("hasRole('Admin')")
    @PutMapping
    public void updateUser(@Valid @RequestBody UserUpdateRequestDto dto){
        UserService.updateUser(dto);
    }

    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        UserService.deleteUser(id);
    }

}
