package com.samir.cloudbalance.services;

import com.samir.cloudbalance.model.User;
import com.samir.cloudbalance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class UserService {

    @Autowired
    public UserRepository userRepo;

    public List<User> allUsers(){
        return userRepo.findAll();
    }

    public void addUser(User user){

        user.setLastLogin(LocalDateTime.now().toString());
        user.setActive(true);

        System.out.println("User : " + user);
        userRepo.save(user);
    }

}
