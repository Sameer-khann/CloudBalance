package com.samir.cloudbalance.dto;

import com.samir.cloudbalance.security.UserRole;
import lombok.Data;

@Data
public class UserRequestDto {

    public Long id;
    public String firstName;
    public String lastName;
    public String email;
    public UserRole role;
    public String password;
    public Boolean active;
}
