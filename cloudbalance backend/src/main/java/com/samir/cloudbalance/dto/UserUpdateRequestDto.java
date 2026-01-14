package com.samir.cloudbalance.dto;

import com.samir.cloudbalance.security.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
//import org.antlr.v4.runtime.misc.NotNull;


import java.util.List;

@Data
public class UserUpdateRequestDto {

    private Long id;

    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 50, message = "First name must be 2–50 characters")
    private String firstName;


    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotNull(message = "Role is required")
    private UserRole role;

//    @NotBlank(message = "Password is required")
//    @Size(min = 8, message = "Password must be at least 8 characters")
//    private String password;
//
//    @NotNull(message = "Active status is required")
//    private Boolean active;

    private List<Long> assignedAccountIds;
}