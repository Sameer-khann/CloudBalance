package com.samir.cloudbalance.services;

import com.samir.cloudbalance.dto.AccountInfoDto;
import com.samir.cloudbalance.dto.AccountResponseDto;
import com.samir.cloudbalance.dto.AssignAccountsDto;
import com.samir.cloudbalance.model.AccountEntity;
import com.samir.cloudbalance.model.UserEntity;
import com.samir.cloudbalance.repository.AccountRepository;
import com.samir.cloudbalance.repository.UserRepository;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.Authentication;
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

    public AccountResponseDto addAccount(AccountInfoDto accountInfoDto){

        AccountEntity existingAccount = accountRepo.findByArnNumber(accountInfoDto.getArnNumber());

        if(existingAccount != null){
            throw new RuntimeException("Account with this ARN number is already exist.");
        }

        AccountEntity accountEntity = new AccountEntity();

        accountEntity.setAccountId(accountInfoDto.getAccountId());
        accountEntity.setAccountName(accountInfoDto.getAccountName());
        accountEntity.setArnNumber(accountInfoDto.getArnNumber());

        System.out.println(accountEntity);
        accountRepo.save(accountEntity);

        AccountResponseDto responseDTO = new AccountResponseDto();
        responseDTO.setAccountID(accountEntity.getAccountId());
        responseDTO.setAccountName(accountEntity.getAccountName());
        responseDTO.setArnNumber(accountEntity.getArnNumber());

        return responseDTO;

//        return new AccountResponseDto(
//                accountEntity.getAccountId(),
//                accountEntity.getAccountName(),
//                accountEntity.getArnNumber()
//        );
    }

    public List<AccountInfoDto> getAllAccounts() {

        return accountRepo.findAll()
                .stream()
                .map(account -> {
                    AccountInfoDto dto = new AccountInfoDto();
                    dto.setAccountId(account.getId());
                    dto.setAccountName(account.getAccountName());
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

    public List<AccountInfoDto> getAccountsForCurrentUser(Authentication auth){

        UserEntity user = (UserEntity) auth.getPrincipal();

        return user.getAssignedAccounts().stream().map(
                account -> {
                    AccountInfoDto dto = new AccountInfoDto();
                    dto.setAccountId(account.getId());
                    dto.setAccountName(account.getAccountName());
                    dto.setArnNumber(account.getArnNumber());
                    return dto;
                }
        ).toList();
    }

}
