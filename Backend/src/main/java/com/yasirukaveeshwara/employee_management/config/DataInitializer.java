package com.yasirukaveeshwara.employee_management.config;

import com.yasirukaveeshwara.employee_management.entity.User;
import com.yasirukaveeshwara.employee_management.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initAdmin(UserRepository userRepository, PasswordEncoder encoder) {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = User.builder()
                        .username("admin")
                        .password(encoder.encode("admin"))  // password will be encrypted
                        .role(User.Role.ADMIN)
                        .name("System Administrator")
                        .build();
                userRepository.save(admin);
                System.out.println("✅ Default admin user created: admin / admin");
            }
        };
    }
}
