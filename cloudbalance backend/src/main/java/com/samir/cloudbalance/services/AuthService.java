package com.samir.cloudbalance.services;

import com.samir.cloudbalance.controller.AuthController;
import com.samir.cloudbalance.model.UserEntity;
import com.samir.cloudbalance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    public UserRepository userRepo;

    public ResponseEntity<?> login(UserEntity userEntity){

        UserEntity isValidUser = userRepo.findByEmail(userEntity.getEmail());

        if(isValidUser == null){
            throw new RuntimeException("User not found");
        }

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(isValidUser);
    }
}
