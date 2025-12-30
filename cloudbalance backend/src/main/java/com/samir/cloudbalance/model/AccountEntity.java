package com.samir.cloudbalance.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Table(name = "accounts")
@AllArgsConstructor
@NoArgsConstructor
public class AccountEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String accountName;

    @Column(unique = true, nullable = false)
    private String arnNumber;

    @ManyToMany(mappedBy = "assignedAccounts")
    @JsonIgnore
    private List<UserEntity> assignedUser;
}
