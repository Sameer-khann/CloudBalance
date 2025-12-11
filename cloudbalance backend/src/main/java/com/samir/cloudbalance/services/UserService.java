package com.samir.cloudbalance.services;

import com.samir.cloudbalance.model.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class UserService {


    List<User> users = new ArrayList<>(Arrays.asList(
            new User("Samirrrrrrrrrrr", "Khan", "samir@example.com", "Admin", "2025-01-05T08:30:00", true),
            new User("John", "Doe", "john@example.com", "Read-Only", "2025-01-04T14:20:00", false),
            new User("Ayesha", "Patel", "ayesha.patel@example.com", "Customer", "2025-01-03T16:45:00", true),
            new User("Rohit", "Sharma", "rohit.sharma@example.com", "Admin", "2025-01-06T10:15:00", true),
            new User("Emily", "Clark", "emily.clark@example.com", "Read-Only", "2025-01-02T09:10:00", false),
            new User("David", "Wilson", "david.wilson@example.com", "Customer", "2025-01-07T08:05:00", true),
            new User("Leena", "Mehta", "leena.mehta@example.com", "Customer", "2025-01-04T12:22:00", true),
            new User("Chris", "Miller", "chris.miller@example.com", "Admin", "2025-01-06T18:32:00", true),
            new User("Sophia", "Lee", "sophia.lee@example.com", "Read-Only", "2025-01-01T14:55:00", false),
            new User("Raj", "Verma", "raj.verma@example.com", "Customer", "2025-01-03T17:40:00", true),
            new User("Michael", "Brown", "michael.brown@example.com", "Admin", "2025-01-05T11:21:00", true),
            new User("Nina", "Singh", "nina.singh@example.com", "Customer", "2025-01-04T08:19:00", false)
    ));

    public List<User> allUsers(){
        return users;
    }

    public void addUser(User user){
        System.out.println("User : " + user);
        users.add(user);
    }

}
