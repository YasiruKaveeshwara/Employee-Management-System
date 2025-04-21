package com.yasirukaveeshwara.employee_management.dto;

import lombok.Data;

@Data
public class UserDto {
    private String name;
    private String email;
    private String phone;
    private String username;
    private String password;
    private String role;
}
