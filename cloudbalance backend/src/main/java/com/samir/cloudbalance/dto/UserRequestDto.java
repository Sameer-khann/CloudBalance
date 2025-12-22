package com.samir.cloudbalance.dto;

import lombok.Data;

@Data
public class UserRequestDto {

    public Long id;
    public String firstName;
    public String lastName;
    public String email;
    public String role;
    public String password;
    public Boolean active;
}
