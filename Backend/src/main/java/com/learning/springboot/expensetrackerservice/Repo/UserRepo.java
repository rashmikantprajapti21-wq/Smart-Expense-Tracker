package com.learning.springboot.expensetrackerservice.Repo;

import com.learning.springboot.expensetrackerservice.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepo extends JpaRepository<User, UUID> {

    void deleteByUsername(String userName);

    User findByUsername(String userName);
}