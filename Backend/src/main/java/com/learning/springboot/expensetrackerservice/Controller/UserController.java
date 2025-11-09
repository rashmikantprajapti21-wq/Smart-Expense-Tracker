package com.learning.springboot.expensetrackerservice.Controller;

import com.learning.springboot.expensetrackerservice.Models.User;
import com.learning.springboot.expensetrackerservice.Repo.UserRepo;
import com.learning.springboot.expensetrackerservice.Service.JwtService;
import com.learning.springboot.expensetrackerservice.Service.User.UserService;
import com.learning.springboot.expensetrackerservice.Service.User.UserServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    private final UserService userService;
    private final UserRepo userRepo;
    private final JwtService jwtService;
    private final UserServiceImplementation userServiceImplementation;
    @Autowired
    public UserController(UserService userService, UserRepo userRepo, JwtService jwtService, UserServiceImplementation userServiceImplementation) {
        this.userService = userService;
        this.userRepo = userRepo;
        this.jwtService = jwtService;
        this.userServiceImplementation = userServiceImplementation;
    }

@PostMapping("/sign-up")
public ResponseEntity<String> signUp(@RequestBody User user) {
    if (userRepo.findByUsername(user.getUsername())!=null) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
    }
    userService.signUp(user);
    return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
}

    @PostMapping("/login")
    public String login(@RequestBody User user){
       return userService.logIn(user);
    }

    @DeleteMapping("/{username}")
    public void deleteUser(@PathVariable String username) {
        userService.deleteUser(username);
    }

    @PostMapping("/validate-token")
    public ResponseEntity<Boolean> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", ""); // Remove "Bearer " prefix
            boolean isValid = jwtService.validateToken(token, userServiceImplementation.loadUserByUsername(jwtService.extractUsername(token)));
            return ResponseEntity.ok(isValid);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @GetMapping("/name/{username}")
    public String usernameToName(@PathVariable String username){
        return userRepo.findByUsername(username).getName();
    }

    @GetMapping("/{username}")
    public UUID usernameToId(@PathVariable String username){
        return userRepo.findByUsername(username).getId();
    }

    @GetMapping("/valid/{username}")
    public Boolean validUsername(@PathVariable String username){
        return userRepo.findByUsername(username)!=null;
    }

    @PatchMapping("/password/{userId}")
    public void changeUserPassword(@PathVariable UUID userId, @RequestBody String password){
        userService.changePassword(userId, password);
    }
}