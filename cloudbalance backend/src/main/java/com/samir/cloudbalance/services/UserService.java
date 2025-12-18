package com.samir.cloudbalance.services;

import com.samir.cloudbalance.exceptionHandlers.UserAlreadyExistsException;
import com.samir.cloudbalance.model.UserEntity;
import com.samir.cloudbalance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {

    @Autowired
    public UserRepository userRepo;

    @Autowired
    public BCryptPasswordEncoder passwordEncoder;

    public List<UserEntity> allUsers(){
        return userRepo.findAll();
    }

    public void addUser(UserEntity userEntity){

        UserEntity newUserEntity = userRepo.findByEmail(userEntity.getEmail());

        if(newUserEntity != null){
            throw new UserAlreadyExistsException("User already exists");
        }

        String hashedPassword = passwordEncoder.encode(userEntity.getPassword());
        userEntity.setPassword(hashedPassword);

        userEntity.setLastLogin(LocalDateTime.now().toString());
        userEntity.setActive(true);

        System.out.println("User : " + userEntity);
        userRepo.save(userEntity);
    }

    public void updateUser(UserEntity userEntity){

        UserEntity existingUserEntity = userRepo.findById(userEntity.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(userRepo.existsByEmailAndIdNot(userEntity.getEmail(), userEntity.getId())){
            throw new UserAlreadyExistsException("Email already in use by another user");
        }

        existingUserEntity.setFirstName(userEntity.getFirstName());
        existingUserEntity.setLastName(userEntity.getLastName());
        existingUserEntity.setEmail(userEntity.getEmail());
        existingUserEntity.setRole(userEntity.getRole());
        existingUserEntity.setLastLogin(LocalDateTime.now().toString());
        existingUserEntity.setActive(userEntity.getActive());

        userRepo.save(existingUserEntity);

    }

    public void deleteUser(Long id){
        UserEntity userEntity = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userRepo.delete(userEntity);
    }
}

