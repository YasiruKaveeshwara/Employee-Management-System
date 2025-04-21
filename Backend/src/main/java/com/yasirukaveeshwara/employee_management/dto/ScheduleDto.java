package com.yasirukaveeshwara.employee_management.dto;

import lombok.Data;

import java.time.LocalTime;
import java.util.Date;

@Data
public class ScheduleDto {
    private Long userId;
    private String shiftType;
    private Date date;
    private LocalTime startTime;
    private LocalTime endTime;
}
