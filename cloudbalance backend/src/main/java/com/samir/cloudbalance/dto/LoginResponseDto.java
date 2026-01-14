package com.samir.cloudbalance.dto;

import com.samir.cloudbalance.security.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDto {

    public Long id;
    public String firstName;
    public String lastName;
//    public String email;
    public UserRole role;
    public String token;
}
