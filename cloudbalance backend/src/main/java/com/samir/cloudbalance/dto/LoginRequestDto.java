package com.samir.cloudbalance.dto;

import lombok.Data;
import jakarta.validation.constraints.*;

@Data
public class LoginRequestDto {

    @NotBlank(message = "Email is required")
    @Email(message = "Email format is invalid")
    public String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max= 30, message = "Password must be at least 6 characters")
    public String password;
}


