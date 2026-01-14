package com.samir.cloudbalance.controller;

import com.samir.cloudbalance.dto.AccountInfoDto;
import com.samir.cloudbalance.dto.AccountResponseDto;
import com.samir.cloudbalance.dto.AssignAccountsDto;
import com.samir.cloudbalance.services.AccountService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
public class AccountController {


    private final AccountService accountService;

    public AccountController(AccountService accountService){
        this.accountService = accountService;
    }

    @PreAuthorize("hasRole('Admin')")
    @PostMapping("/account")
    public ResponseEntity<AccountResponseDto> addAccount(@Valid @RequestBody AccountInfoDto accountInfoDto){

        AccountResponseDto createdAccount = accountService.addAccount(accountInfoDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAccount);
    }

    @PreAuthorize("hasAnyRole('Admin', 'ReadOnly')")
    @GetMapping("/account")
    public ResponseEntity<List<AccountInfoDto>> getAccounts(){
        return ResponseEntity.ok(accountService.getAllAccounts());
    }

//    @PreAuthorize("hasRole('Admin')")
//    @PostMapping("/assign")
//    public void assignAccountsToUser(@RequestBody AssignAccountsDto assignAccountsDto){
//        accountService.assignAccountsToUser(assignAccountsDto);
//    }


    @PreAuthorize("hasRole('Customer')")
    @GetMapping("/account/my")
    public List<AccountInfoDto> getMyAccounts(Authentication authentication){

        return accountService.getAccountsForCurrentUser(authentication);

    }


}
