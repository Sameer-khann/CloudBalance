package com.samir.cloudbalance.model;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class User {

    private String firstName;
    private String lastName;
    private String email;
    private String role;       // single role
    private String lastLogin;
    private boolean active;

//    public User(String firstName, String lastName, String email, String role, String lastLogin, boolean active) {
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.email = email;
//        this.role = role;
//        this.lastLogin = lastLogin;
//        this.active = active;
//    }
}
