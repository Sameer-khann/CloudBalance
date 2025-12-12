package com.samir.cloudbalance.repository;

import com.samir.cloudbalance.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
