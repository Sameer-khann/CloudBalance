package com.samir.cloudbalance.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class BlacklistedTokenEntity {

    @Id
    private String token;
    private Instant expiry;
}
