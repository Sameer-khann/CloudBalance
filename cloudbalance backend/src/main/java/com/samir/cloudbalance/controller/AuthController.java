package com.samir.cloudbalance.controller;

import com.samir.cloudbalance.model.UserEntity;
import com.samir.cloudbalance.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class AuthController {

    @Autowired
    public AuthService authService;



    @PostMapping
    public ResponseEntity<?> login(@RequestBody UserEntity userEntity) {

        System.out.println(userEntity);
        return authService.login(userEntity);
    }

}
