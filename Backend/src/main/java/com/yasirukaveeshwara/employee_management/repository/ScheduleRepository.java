package com.yasirukaveeshwara.employee_management.repository;

import com.yasirukaveeshwara.employee_management.entity.Schedule;
import com.yasirukaveeshwara.employee_management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByUserAndDate(User user, Date date);
    List<Schedule> findByUser(User user);
}
