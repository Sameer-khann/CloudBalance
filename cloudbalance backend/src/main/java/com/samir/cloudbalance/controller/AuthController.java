package com.samir.cloudbalance.controller;

import com.samir.cloudbalance.dto.LoginRequestDto;
import com.samir.cloudbalance.dto.LoginResponseDto;
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
    public ResponseEntity<?> login(@RequestBody LoginRequestDto request) {

        System.out.println(request);
        LoginResponseDto response = authService.login(request);
        return ResponseEntity.ok(response);
    }

}
