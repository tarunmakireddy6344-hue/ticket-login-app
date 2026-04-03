package com.ticketapp.service;

import com.ticketapp.model.User;
import com.ticketapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public boolean authenticate(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // In a production environment, you MUST use password hashing (e.g. BCrypt)
            // Here we are comparing plain text for educational simplicity
            return user.getPassword().equals(password);
        }
        return false;
    }
}
