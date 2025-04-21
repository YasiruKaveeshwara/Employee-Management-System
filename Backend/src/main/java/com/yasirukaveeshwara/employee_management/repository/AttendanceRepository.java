package com.yasirukaveeshwara.employee_management.repository;

import com.yasirukaveeshwara.employee_management.entity.Attendance;
import com.yasirukaveeshwara.employee_management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Optional<Attendance> findByUserAndDate(User user, Date date);
    List<Attendance> findAllByUserOrderByDateDesc(User user);
}
