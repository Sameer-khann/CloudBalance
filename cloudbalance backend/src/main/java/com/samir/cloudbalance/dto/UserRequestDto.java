package com.samir.cloudbalance.dto;

import com.samir.cloudbalance.security.UserRole;
import lombok.Data;

import java.util.List;

@Data
public class UserRequestDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private UserRole role;
    private String password;
    private Boolean active;

    private List<Long> assignedAccountIds;
}
