package com.yasirukaveeshwara.employee_management.dto;

import lombok.Data;

@Data
public class AttendanceDto {
    private Long userId;
    private String type; // "IN" or "OUT"
}
