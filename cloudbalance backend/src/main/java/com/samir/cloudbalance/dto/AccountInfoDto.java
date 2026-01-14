package com.samir.cloudbalance.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class AccountInfoDto {

    @NotNull(message = "Account ID is required")
   private long accountId;

    @NotBlank(message = "Account name is required")
   private String accountName;

//    @NotBlank(message = "ARN number is required")
//    @Pattern(
//            regexp = "^arn:aws:[a-z0-9-]+:[a-z0-9-]*:[0-9]{12}:.+$",
//            message = "Invalid AWS ARN format"
//    )

    @NotBlank(message = "ARN number is required")
   private String arnNumber;
}
