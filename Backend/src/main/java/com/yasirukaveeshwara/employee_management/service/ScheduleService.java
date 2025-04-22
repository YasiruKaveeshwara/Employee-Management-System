package com.yasirukaveeshwara.employee_management.service;

import com.yasirukaveeshwara.employee_management.entity.Schedule;
import com.yasirukaveeshwara.employee_management.entity.User;
import com.yasirukaveeshwara.employee_management.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    public Schedule assignSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }

    public List<Schedule> getSchedulesForUser(User user) {
        return scheduleRepository.findByUser(user);
    }

    public List<Schedule> getSchedulesForUserOnDate(User user, LocalDate date) {
        return scheduleRepository.findByUserAndDate(user, date);
    }

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll(); // or customize with sorting/filtering
    }
    
}
