package com.samir.cloudbalance.services;

import com.samir.cloudbalance.dto.AccountInfoDto;
import com.samir.cloudbalance.dto.AssignAccountsDto;
import com.samir.cloudbalance.model.AccountEntity;
import com.samir.cloudbalance.model.UserEntity;
import com.samir.cloudbalance.repository.AccountRepository;
import com.samir.cloudbalance.repository.UserRepository;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {


    public AccountRepository accountRepo;
    public UserRepository userRepo;


    public AccountService(AccountRepository accountRepo, UserRepository userRepo){
        this.accountRepo = accountRepo;
        this.userRepo = userRepo;
    }

    public void addAccount(AccountInfoDto accountInfoDto){

        AccountEntity existingAccount = accountRepo.findByArnNumber(accountInfoDto.getArnNumber());

        if(existingAccount != null){
            throw new RuntimeException("Account with this ARN number is already exist.");
        }

        AccountEntity accountEntity = new AccountEntity();

        accountEntity.setAccountName(accountInfoDto.getName());
        accountEntity.setArnNumber(accountInfoDto.getArnNumber());

        System.out.println(accountEntity);
        accountRepo.save(accountEntity);
    }

    public List<AccountInfoDto> getAllAccounts() {

        return accountRepo.findAll()
                .stream()
                .map(account -> {
                    AccountInfoDto dto = new AccountInfoDto();
                    dto.setId(account.getId());
                    dto.setName(account.getAccountName());
                    dto.setArnNumber(account.getArnNumber());
                    return dto;
                })
                .toList();
    }

    public void assignAccountsToUser(AssignAccountsDto assignAccountsDto){

        UserEntity user = userRepo.findById(assignAccountsDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found!"));

        List<AccountEntity> accountsToAssign = accountRepo.findAllById(assignAccountsDto.getAccountsIds());

               // save from duplicate items in acconts
        for (AccountEntity account : accountsToAssign) {
            if (!user.getAssignedAccounts().contains(account)) {
                user.getAssignedAccounts().add(account);
            }
        }
        userRepo.save(user);
    }

}
