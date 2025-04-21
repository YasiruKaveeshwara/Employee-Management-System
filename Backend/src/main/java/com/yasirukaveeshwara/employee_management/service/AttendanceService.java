package com.yasirukaveeshwara.employee_management.service;

import com.yasirukaveeshwara.employee_management.entity.Attendance;
import com.yasirukaveeshwara.employee_management.entity.User;
import com.yasirukaveeshwara.employee_management.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    public Attendance markInTime(User user) {
        Date today = new Date();
        Optional<Attendance> attendanceOpt = attendanceRepository.findByUserAndDate(user, today);

        if (attendanceOpt.isPresent()) {
            Attendance a = attendanceOpt.get();
            a.setInTime(new Date());
            return attendanceRepository.save(a);
        } else {
            Attendance a = Attendance.builder()
                    .user(user)
                    .date(today)
                    .inTime(new Date())
                    .build();
            return attendanceRepository.save(a);
        }
    }

    public Attendance markOutTime(User user) {
        Date today = new Date();
        Attendance a = attendanceRepository.findByUserAndDate(user, today)
                .orElseThrow(() -> new RuntimeException("Attendance not started"));
        a.setOutTime(new Date());
        return attendanceRepository.save(a);
    }

 

public List<Attendance> getAttendanceForUser(User user) {
    return attendanceRepository.findAllByUserOrderByDateDesc(user);
}

}
