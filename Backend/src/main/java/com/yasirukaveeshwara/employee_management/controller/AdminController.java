package com.yasirukaveeshwara.employee_management.controller;

import com.yasirukaveeshwara.employee_management.dto.ScheduleDto;
import com.yasirukaveeshwara.employee_management.dto.UserDto;
import com.yasirukaveeshwara.employee_management.entity.Schedule;
import com.yasirukaveeshwara.employee_management.entity.User;
import com.yasirukaveeshwara.employee_management.service.ScheduleService;
import com.yasirukaveeshwara.employee_management.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final ScheduleService scheduleService;

    @PostMapping("/employee")
    public ResponseEntity<?> createEmployee(@RequestBody UserDto dto) {
        User user = User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .username(dto.getUsername())
                .password(dto.getPassword())
                .role(User.Role.EMPLOYEE)
                .build();
        return ResponseEntity.ok(userService.createEmployee(user));
    }

    @GetMapping("/employees")
    public List<User> getAllEmployees() {
        return userService.getAllEmployees();
    }

    @PutMapping("/employee/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody UserDto dto) {
        return ResponseEntity.ok(userService.updateEmployee(id, dto));
    }

    @DeleteMapping("/employee/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok("Deleted employee with ID: " + id);
    }

    @PostMapping("/schedule/{userId}")
    public ResponseEntity<?> assignSchedule(
            @PathVariable Long userId,
            @RequestParam Date date,
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
}
