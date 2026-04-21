package com.nexustrade.core.dto;

import com.nexustrade.core.enums.Role;
import lombok.Data;

@Data
public class JwtResponse {
    
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private Role role;

    public JwtResponse(String token, Long id, String username, Role role) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.role = role;
    }
}
