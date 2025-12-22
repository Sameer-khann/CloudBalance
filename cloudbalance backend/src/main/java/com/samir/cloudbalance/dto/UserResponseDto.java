package com.samir.cloudbalance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponseDto {

    public Long id;
    public String firstName;
    public String lastName;
    public String email;
    public String role;
    public String lastLogin;
    public Boolean active;
}
