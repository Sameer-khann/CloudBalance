package com.samir.cloudbalance.services;

import com.samir.cloudbalance.dto.UserRequestDto;
import com.samir.cloudbalance.dto.UserResponseDto;
import com.samir.cloudbalance.dto.UserUpdateRequestDto;
import com.samir.cloudbalance.exception.ResourceNotFoundException;
import com.samir.cloudbalance.exception.UserAlreadyExistsException;
import com.samir.cloudbalance.model.AccountEntity;
import com.samir.cloudbalance.model.UserEntity;
import com.samir.cloudbalance.repository.AccountRepository;
import com.samir.cloudbalance.repository.UserRepository;
import com.samir.cloudbalance.security.UserRole;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class UserService {

    @Autowired
    public UserRepository userRepo;

    @Autowired
    public AccountRepository accountRepo;

    @Autowired
    public PasswordEncoder passwordEncoder;

    public UserResponseDto mapToResponse(UserEntity user){

        return new UserResponseDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole(),
                user.getLastLogin(),
                user.getActive(),
                user.getAssignedAccounts()
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

        if(userRequestDto.getRole() == UserRole.Customer && userRequestDto.getAssignedAccountIds() != null){

            List<AccountEntity> accounts = accountRepo.findAllById(userRequestDto.getAssignedAccountIds());

            user.getAssignedAccounts().addAll(accounts);
        }

        log.info("User : " + userRequestDto);
        userRepo.save(user);
    }

    public void updateUser(UserUpdateRequestDto dto){

        log.info("Updating user with ID: {}", dto.getId());
        UserEntity existingUserEntity = userRepo.findById(dto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if(userRepo.existsByEmailAndIdNot(dto.getEmail(), dto.getId())){
            throw new UserAlreadyExistsException("Email already in use by another user");
        }

//        List<UserEntity> users = userRepo.findByEmailOrderByIdDesc(userRequestDto.getEmail());

        log.info("this is " + dto);

        existingUserEntity.setFirstName(dto.getFirstName());
        existingUserEntity.setLastName(dto.getLastName());
        existingUserEntity.setEmail(dto.getEmail());
        existingUserEntity.setRole(dto.getRole());
        existingUserEntity.setLastLogin(LocalDateTime.now().toString());
//        existingUserEntity.setActive(userRequestDto.getActive());


        if(dto.getRole() == UserRole.Customer){

            existingUserEntity.getAssignedAccounts().clear();

            if(dto.getAssignedAccountIds() != null){

            List<AccountEntity> accounts = accountRepo.findAllById(dto.getAssignedAccountIds());
            existingUserEntity.getAssignedAccounts().addAll(accounts);
            }
        }
        else{
            existingUserEntity.getAssignedAccounts().clear();
        }

        userRepo.save(existingUserEntity);

    }

    public void deleteUser(Long id){
        UserEntity userEntity = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userRepo.delete(userEntity);
    }


}

