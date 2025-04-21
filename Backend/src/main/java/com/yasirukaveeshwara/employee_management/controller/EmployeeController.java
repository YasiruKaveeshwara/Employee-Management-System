package com.yasirukaveeshwara.employee_management.controller;

import com.yasirukaveeshwara.employee_management.entity.User;
import com.yasirukaveeshwara.employee_management.service.AttendanceService;
import com.yasirukaveeshwara.employee_management.service.ScheduleService;
import com.yasirukaveeshwara.employee_management.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/employee")
@PreAuthorize("hasRole('EMPLOYEE')")
@RequiredArgsConstructor
public class EmployeeController {

    private final UserService userService;
    private final AttendanceService attendanceService;
    private final ScheduleService scheduleService;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Principal principal) {
        User user = userService.getUserByUsername(principal.getName());
        return ResponseEntity.ok(user);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody User updatedUser, Principal principal) {
        User current = userService.getUserByUsername(principal.getName());
        current.setName(updatedUser.getName());
        current.setEmail(updatedUser.getEmail());
        current.setPhone(updatedUser.getPhone());
        return ResponseEntity.ok(userService.updateUser(current));
    }

    @GetMapping("/schedules")
    public ResponseEntity<?> getSchedules(Principal principal) {
        User user = userService.getUserByUsername(principal.getName());
        return ResponseEntity.ok(scheduleService.getSchedulesForUser(user));
    }

    @PostMapping("/attendance")
    public ResponseEntity<?> markAttendance(@RequestParam("type") String type, Principal principal) {
        User user = userService.getUserByUsername(principal.getName());

        return switch (type.toUpperCase()) {
            case "IN" -> ResponseEntity.ok(attendanceService.markInTime(user));
            case "OUT" -> ResponseEntity.ok(attendanceService.markOutTime(user));
            default -> ResponseEntity.badRequest().body("Invalid type. Use IN or OUT.");
        };
    }
}
