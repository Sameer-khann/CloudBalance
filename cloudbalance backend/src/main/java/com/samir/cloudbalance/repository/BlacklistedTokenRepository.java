package com.samir.cloudbalance.repository;

import com.samir.cloudbalance.model.BlacklistedTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlacklistedTokenRepository extends JpaRepository<BlacklistedTokenEntity, String> {


}
