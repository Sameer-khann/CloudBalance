package com.samir.cloudbalance.controller;

import com.samir.cloudbalance.dto.AccountInfoDto;
import com.samir.cloudbalance.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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

}
