package com.yasirukaveeshwara.employee_management.service;

import com.yasirukaveeshwara.employee_management.entity.Attendance;
import com.yasirukaveeshwara.employee_management.entity.Schedule;
import com.yasirukaveeshwara.employee_management.entity.User;
import com.yasirukaveeshwara.employee_management.repository.AttendanceRepository;
import com.yasirukaveeshwara.employee_management.repository.ScheduleRepository;
import com.yasirukaveeshwara.employee_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    public List<Schedule> getSchedulesByUser(String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        return scheduleRepository.findByUser(user);
    }

    public Attendance markAttendance(String username, boolean isCheckIn) {
        User user = userRepository.findByUsername(username).orElseThrow();
        Date today = new Date();

        Attendance attendance = attendanceRepository.findByUserAndDate(user, today)
                .orElseGet(() -> Attendance.builder()
                        .user(user)
                        .date(today)
                        .build());

        Date now = new Date();
        if (isCheckIn) {
            attendance.setInTime(now);
        } else {
            attendance.setOutTime(now);
        }

        return attendanceRepository.save(attendance);
    }

    public User getProfile(String username) {
        return userRepository.findByUsername(username).orElseThrow();
    }
}
