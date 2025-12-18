package com.samir.cloudbalance.repository;

import com.samir.cloudbalance.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {

    UserEntity findByEmail(String email);

    boolean existsByEmailAndIdNot(String email, Long id);

}
