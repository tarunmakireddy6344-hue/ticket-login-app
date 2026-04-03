package com.ticketapp.controller;

import com.ticketapp.dto.LoginRequest;
import com.ticketapp.dto.LoginResponse;
import com.ticketapp.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow any frontend domain for production
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        boolean isAuthenticated = authService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
        
        if (isAuthenticated) {
            return ResponseEntity.ok(new LoginResponse(true, "Login Successful!", "dummy-token-12345"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(new LoginResponse(false, "Invalid username or password", null));
        }
    }
}
