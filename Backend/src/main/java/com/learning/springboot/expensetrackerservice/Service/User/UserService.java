package com.learning.springboot.expensetrackerservice.Service.User;

import com.learning.springboot.expensetrackerservice.Models.User;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public interface UserService {
    void signUp(User user);
    void deleteUser(String userName);
    String logIn(User user);
    void changePassword(UUID userId, String password);
}
