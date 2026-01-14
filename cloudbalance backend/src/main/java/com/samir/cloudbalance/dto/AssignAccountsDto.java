package com.samir.cloudbalance.dto;

import com.samir.cloudbalance.model.AccountEntity;
import lombok.Data;
import jakarta.validation.constraints.*;
import java.util.List;

@Data
public class AssignAccountsDto {

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotEmpty(message = "At least one account must be assigned")
    private List<Long> accountsIds;
}
