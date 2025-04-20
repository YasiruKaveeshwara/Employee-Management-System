package com.yasirukaveeshwara.employee_management.controller;

import com.yasirukaveeshwara.employee_management.entity.Attendance;
import com.yasirukaveeshwara.employee_management.entity.User;
import com.yasirukaveeshwara.employee_management.repository.AttendanceRepository;
import com.yasirukaveeshwara.employee_management.repository.ScheduleRepository;
import com.yasirukaveeshwara.employee_management.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/employee")
@PreAuthorize("hasRole('EMPLOYEE')")
public class EmployeeController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    // ✅ View own profile
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Principal principal) {
        return userRepository.findByUsername(principal.getName())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Update own profile (except password, username)
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody User updated, Principal principal) {
        return userRepository.findByUsername(principal.getName())
                .map(user -> {
                    user.setName(updated.getName());
                    user.setEmail(updated.getEmail());
                    user.setPhone(updated.getPhone());
                    return ResponseEntity.ok(userRepository.save(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ View schedules
    @GetMapping("/schedules")
    public ResponseEntity<?> getSchedules(Principal principal) {
        return userRepository.findByUsername(principal.getName())
                .map(user -> ResponseEntity.ok(scheduleRepository.findByUser(user)))
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Mark attendance (check-in or check-out)
    @PostMapping("/attendance")
    public ResponseEntity<?> markAttendance(Principal principal) {
        User user = userRepository.findByUsername(principal.getName()).orElse(null);
        if (user == null) return ResponseEntity.notFound().build();

        Date today = new Date();
        Attendance attendance = attendanceRepository.findByUserAndDate(user, today).orElse(null);

        Date now = new Date();

        if (attendance == null) {
            // First time (check-in)
            Attendance newAttendance = Attendance.builder()
                    .user(user)
                    .date(today)
                    .inTime(now)
                    .build();
            attendanceRepository.save(newAttendance);
            return ResponseEntity.ok("Check-in marked at: " + now);
        } else if (attendance.getOutTime() == null) {
            // Second time (check-out)
            attendance.setOutTime(now);
            attendanceRepository.save(attendance);
            return ResponseEntity.ok("Check-out marked at: " + now);
        } else {
            return ResponseEntity.badRequest().body("Attendance already completed for today.");
        }
    }
}
