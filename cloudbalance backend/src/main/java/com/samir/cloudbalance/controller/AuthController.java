package com.samir.cloudbalance.controller;

import com.samir.cloudbalance.dto.LoginRequestDto;
import com.samir.cloudbalance.dto.LoginResponseDto;
import com.samir.cloudbalance.model.BlacklistedTokenEntity;
import com.samir.cloudbalance.model.UserEntity;
import com.samir.cloudbalance.repository.BlacklistedTokenRepository;
import com.samir.cloudbalance.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping
public class AuthController {

    @Autowired
    public AuthService authService;

    @Autowired
    public BlacklistedTokenRepository blacklistedTokenRepo;



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto request) {

        System.out.println(request);
        LoginResponseDto response = authService.login(request);
        return ResponseEntity.ok(response);
    }

//    @PostMapping("/logout")
//    public ResponseEntity<?> logout(@RequestBody String token){
//        authService.logout(token);
//
//        return ResponseEntity.ok("Logout successful");
//    }

    @PostMapping("/api/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {

        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Token missing");
        }

        String token = authHeader.substring(7);
        authService.logout(token);

        return ResponseEntity.ok("Logout successful");
    }



}
