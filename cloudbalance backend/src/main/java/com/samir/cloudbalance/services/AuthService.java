package com.samir.cloudbalance.services;

import com.samir.cloudbalance.controller.AuthController;
import com.samir.cloudbalance.dto.LoginRequestDto;
import com.samir.cloudbalance.dto.LoginResponseDto;
import com.samir.cloudbalance.model.UserEntity;
import com.samir.cloudbalance.repository.UserRepository;
import com.samir.cloudbalance.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    public UserRepository userRepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponseDto login(LoginRequestDto loginRequest){

        UserEntity validUser = userRepo.findByEmail(loginRequest.getEmail());

        if(validUser == null){
            throw new RuntimeException("User not found");
        }

        //Order matter krta hai
        if(!passwordEncoder.matches(loginRequest.getPassword(), validUser.getPassword())){
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(validUser.getEmail());

        return new LoginResponseDto(
            validUser.getId(),
            validUser.getFirstName(),
            validUser.getLastName(),
            validUser.getEmail(),
            validUser.getRole(),
                token
        );
    }
}
