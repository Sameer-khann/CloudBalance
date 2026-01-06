package com.samir.cloudbalance.repository;

import com.samir.cloudbalance.model.UserEntity;
import org.apache.catalina.LifecycleState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {

    UserEntity findByEmail(String email);

    boolean existsByEmailAndIdNot(String email, Long id);

//    List<UserEntity>findByEmailOrderByIdDesc(String email);

}
