package com.samir.cloudbalance.repository;

import com.samir.cloudbalance.model.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Long> {

    AccountEntity findByArnNumber(String arnNumber);
}
