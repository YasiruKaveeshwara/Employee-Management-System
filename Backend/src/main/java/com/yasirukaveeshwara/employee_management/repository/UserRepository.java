package com.yasirukaveeshwara.employee_management.repository;

import com.yasirukaveeshwara.employee_management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
