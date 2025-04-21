package com.yasirukaveeshwara.employee_management.controller;

import com.yasirukaveeshwara.employee_management.config.JwtUtil;
import com.yasirukaveeshwara.employee_management.dto.LoginRequest;
import com.yasirukaveeshwara.employee_management.dto.LoginResponse;
import com.yasirukaveeshwara.employee_management.entity.User;
import com.yasirukaveeshwara.employee_management.repository.UserRepository;
import com.yasirukaveeshwara.employee_management.service.AuthService;

import lombok.RequiredArgsConstructor;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> optionalUser = authService.validateUser(request.getUsername(), request.getPassword());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        User user = optionalUser.get();
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());

        return ResponseEntity.ok(new LoginResponse(token, user.getRole().name()));
    }
}
