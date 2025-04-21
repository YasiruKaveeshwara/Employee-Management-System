package com.yasirukaveeshwara.employee_management.service;

import com.yasirukaveeshwara.employee_management.dto.UserDto;
import com.yasirukaveeshwara.employee_management.entity.User;
import com.yasirukaveeshwara.employee_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createEmployee(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists: " + user.getUsername());
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    

    public List<User> getAllEmployees() {
        return userRepository.findAll()
                .stream()
                .filter(u -> u.getRole() == User.Role.EMPLOYEE)
                .toList();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateEmployee(Long id, UserDto dto) {
    User user = getUserById(id);
    user.setName(dto.getName());
    user.setEmail(dto.getEmail());
    user.setPhone(dto.getPhone());
    return userRepository.save(user);
}

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
    }
    

}
