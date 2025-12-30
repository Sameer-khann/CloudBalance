package com.samir.cloudbalance.controller;

import com.samir.cloudbalance.dto.AccountInfoDto;
import com.samir.cloudbalance.dto.AssignAccountsDto;
import com.samir.cloudbalance.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AccountController {


    private final AccountService accountService;

    public AccountController(AccountService accountService){
        this.accountService = accountService;
    }

    @PostMapping("/account")
    public void addAccount(@RequestBody AccountInfoDto accountInfoDto){

        accountService.addAccount(accountInfoDto);

    }

    @GetMapping("/account")
    public List<AccountInfoDto> getAccounts(){
        return accountService.getAllAccounts();
    }

    @PostMapping("/assign")
    public void assignAccountsToUser(@RequestBody AssignAccountsDto assignAccountsDto){
        accountService.assignAccountsToUser(assignAccountsDto);
    }

}
