package com.samir.cloudbalance.services;

import com.samir.cloudbalance.dto.UserRequestDto;
import com.samir.cloudbalance.dto.UserResponseDto;
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

    public UserResponseDto mapToResponse(UserEntity user){

        return new UserResponseDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole(),
                user.getLastLogin(),
                user.getActive()
        );
    }

    public List<UserResponseDto> allUsers(){
        return userRepo.findAll().stream().map(this :: mapToResponse).toList();
    }

    public void addUser(UserRequestDto userRequestDto){

        UserEntity existingUser = userRepo.findByEmail(userRequestDto.getEmail());

        if(existingUser != null){
            throw new UserAlreadyExistsException("User already exists");
        }

        UserEntity user = new UserEntity();

        user.setFirstName(userRequestDto.getFirstName());
        user.setLastName(userRequestDto.getLastName());
        user.setEmail(userRequestDto.getEmail());
        user.setRole(userRequestDto.getRole());
        user.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));
        user.setLastLogin(LocalDateTime.now().toString());
        user.setActive(userRequestDto.getActive());

        System.out.println("User : " + userRequestDto);
        userRepo.save(user);
    }

    public void updateUser(UserRequestDto userRequestDto){

        System.out.println(userRequestDto);

        UserEntity existingUserEntity = userRepo.findById(userRequestDto.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(userRepo.existsByEmailAndIdNot(userRequestDto.getEmail(), userRequestDto.getId())){
            throw new UserAlreadyExistsException("Email already in use by another user");
        }

        existingUserEntity.setFirstName(userRequestDto.getFirstName());
        existingUserEntity.setLastName(userRequestDto.getLastName());
        existingUserEntity.setEmail(userRequestDto.getEmail());
        existingUserEntity.setRole(userRequestDto.getRole());
        existingUserEntity.setLastLogin(LocalDateTime.now().toString());
        existingUserEntity.setActive(userRequestDto.getActive());

        userRepo.save(existingUserEntity);

    }

    public void deleteUser(Long id){
        UserEntity userEntity = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userRepo.delete(userEntity);
    }
}

