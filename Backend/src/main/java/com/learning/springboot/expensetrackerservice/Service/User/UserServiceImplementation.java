package com.learning.springboot.expensetrackerservice.Service.User;

import com.learning.springboot.expensetrackerservice.Models.User;
import com.learning.springboot.expensetrackerservice.Models.UserPrincipal;
import com.learning.springboot.expensetrackerservice.Repo.UserRepo;
import com.learning.springboot.expensetrackerservice.Service.JwtService;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImplementation implements UserService, UserDetailsService {

    private final UserRepo userRepo;
    private final AuthenticationManager authManager;
    private final BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder(12);
    private final JwtService jwtService;

    public UserServiceImplementation(UserRepo userRepo, @Lazy AuthenticationManager authManager, JwtService jwtService) {
        this.userRepo = userRepo;
        this.authManager = authManager;
        this.jwtService = jwtService;
    }

    @Override

    public void signUp(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
    }

    @Override
    public void deleteUser(String userName) {
        userRepo.deleteByUsername(userName);
    }

    @Override
    public String logIn(User user) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(
                user.getUsername(), user.getPassword()
            )
        );
        if(authentication.isAuthenticated())
           return jwtService.generateToken(user.getUsername());
        return "Fail";
    }

    @Override
    public void changePassword(UUID userId, String password) {
        Optional<User> userOptional = userRepo.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(passwordEncoder.encode(password));
//            user.setPassword(password);
            userRepo.save(user);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User users = userRepo.findByUsername(username);
        if (users == null)
            throw new UsernameNotFoundException("User Not Found");
        return new UserPrincipal(users);
    }
}
