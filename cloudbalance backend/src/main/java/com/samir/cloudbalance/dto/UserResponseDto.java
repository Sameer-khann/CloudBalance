package com.samir.cloudbalance.dto;

import com.samir.cloudbalance.model.AccountEntity;
import com.samir.cloudbalance.security.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UserResponseDto {

    public Long id;
    public String firstName;
    public String lastName;
    public String email;
    public UserRole role;
    public String lastLogin;
    public Boolean active;

    private List<AccountEntity> assignedAccounts;
}
