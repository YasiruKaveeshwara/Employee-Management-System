package com.yasirukaveeshwara.employee_management.controller;

import com.yasirukaveeshwara.employee_management.entity.Schedule;
import com.yasirukaveeshwara.employee_management.entity.User;
import com.yasirukaveeshwara.employee_management.repository.ScheduleRepository;
import com.yasirukaveeshwara.employee_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ Create a new employee
    @PostMapping("/employee")
    public ResponseEntity<?> createEmployee(@RequestBody User user) {
        user.setRole(User.Role.EMPLOYEE);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return ResponseEntity.ok(userRepository.save(user));
    }

    // ✅ Get all employees
    @GetMapping("/employees")
    public List<User> getAllEmployees() {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole() == User.Role.EMPLOYEE)
                .toList();
    }

    // ✅ Update employee
    @PutMapping("/employee/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setPhone(updatedUser.getPhone());
            return ResponseEntity.ok(userRepository.save(user));
        }).orElse(ResponseEntity.notFound().build());
    }

    // ✅ Delete employee
    @DeleteMapping("/employee/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // ✅ Assign schedule to an employee
    @PostMapping("/schedule/{userId}")
    public ResponseEntity<?> assignSchedule(
            @PathVariable Long userId,
            @RequestParam Date date,
            @RequestParam String shiftType) {

        LocalTime start;
        LocalTime end;

        switch (shiftType.toUpperCase()) {
            case "DAY" -> {
                start = LocalTime.of(6, 0);
                end = LocalTime.of(14, 0);
            }
            case "AFTERNOON" -> {
                start = LocalTime.of(14, 0);
                end = LocalTime.of(22, 0);
            }
            case "NIGHT" -> {
                start = LocalTime.of(22, 0);
                end = LocalTime.of(6, 0); // next day
            }
            default -> {
                return ResponseEntity.badRequest().body("Invalid shift type.");
            }
        }

        Schedule schedule = Schedule.builder()
                .user(userRepository.findById(userId).orElseThrow())
                .date(date)
                .shiftType(shiftType.toUpperCase())
                .startTime(start)
                .endTime(end)
                .build();

        return ResponseEntity.ok(scheduleRepository.save(schedule));
    }
}