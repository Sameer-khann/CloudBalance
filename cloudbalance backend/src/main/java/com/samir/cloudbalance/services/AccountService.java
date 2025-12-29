package com.samir.cloudbalance.services;

import com.samir.cloudbalance.dto.AccountInfoDto;
import com.samir.cloudbalance.model.AccountEntity;
import com.samir.cloudbalance.repository.AccountRepository;
import org.springframework.stereotype.Service;

@Service
public class AccountService {


    public AccountRepository accountRepo;

    public AccountService(AccountRepository accountRepo){
        this.accountRepo = accountRepo;
    }

    public void addAccount(AccountInfoDto accountInfoDto){

        AccountEntity existingAccount = accountRepo.findByArnNumber(accountInfoDto.getArnNumber());

        if(existingAccount != null){
            throw new RuntimeException("Account with this ARN number is already exist.");
        }

        AccountEntity accountEntity = new AccountEntity();

        System.out.println(accountEntity);
        accountRepo.save(accountEntity);
    }
}
