package com.samir.cloudbalance.dto;

import com.samir.cloudbalance.model.AccountEntity;
import lombok.Data;

import java.util.List;

@Data
public class AssignAccountsDto {

    private Long userId;
    private List<Long> accountsIds;
}
