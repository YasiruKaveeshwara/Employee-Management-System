package com.yasirukaveeshwara.employee_management.controller;

import com.yasirukaveeshwara.employee_management.dto.UserDto;
import com.yasirukaveeshwara.employee_management.entity.Schedule;
import com.yasirukaveeshwara.employee_management.entity.User;
import com.yasirukaveeshwara.employee_management.service.ScheduleService;
import com.yasirukaveeshwara.employee_management.service.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final ScheduleService scheduleService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/employee")
    public ResponseEntity<?> createUser(@RequestBody UserDto dto) {
        User.Role role;
        try {
            role = User.Role.valueOf(dto.getRole().toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid role: " + dto.getRole());
        }

        User user = User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .username(dto.getUsername())
                .password(dto.getPassword())
                .role(role) // ✅ Use the role sent from frontend
                .build();

                return ResponseEntity.ok(userService.createUser(user));

    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/employees")
    public List<User> getAllEmployees() {
        return userService.getAllEmployees();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/employee/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody UserDto dto) {
        return ResponseEntity.ok(userService.updateEmployee(id, dto));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/employee/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok("Deleted employee with ID: " + id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/employee/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/schedules")
    public ResponseEntity<?> getAllSchedules() {
        return ResponseEntity.ok(scheduleService.getAllSchedules());
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/schedule/{userId}")
    public ResponseEntity<?> assignSchedule(
            @PathVariable Long userId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
            @RequestParam String shiftType) {

        LocalTime start, end;
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
                end = LocalTime.of(6, 0);
            }
            default -> {
                return ResponseEntity.badRequest().body("Invalid shift type.");
            }
        }

        Schedule schedule = new Schedule();
        schedule.setUser(userService.getUserById(userId));
        schedule.setDate(date);
        schedule.setShiftType(shiftType.toUpperCase());
        schedule.setStartTime(start);
        schedule.setEndTime(end);

        return ResponseEntity.ok(scheduleService.assignSchedule(schedule));
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/profile")
    public ResponseEntity<?> getAdminProfile(java.security.Principal principal) {
        if (principal == null || principal.getName() == null) {
            return ResponseEntity.status(401).body("Unauthorized: No authenticated user found");
        }

        try {
            User user = userService.getUserByUsername(principal.getName());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("User not found: " + e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/profile")
    public ResponseEntity<?> updateAdminProfile(@RequestBody UserDto dto, java.security.Principal principal) {
        if (principal == null || principal.getName() == null) {
            return ResponseEntity.status(401).body("Unauthorized: No authenticated user");
        }

        try {
            User user = userService.getUserByUsername(principal.getName());
            user.setName(dto.getName());
            user.setEmail(dto.getEmail());
            user.setPhone(dto.getPhone());

            userService.updateUser(user);
            return ResponseEntity.ok("Profile updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to update profile: " + e.getMessage());
        }
    }


    
}
