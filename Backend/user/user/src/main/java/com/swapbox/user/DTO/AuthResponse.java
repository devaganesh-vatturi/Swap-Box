package com.swapbox.user.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private Long userId;
    private String token;
    @Builder.Default
    private String tokenType = "Bearer";
    private long expiresIn;

    public AuthResponse(Long userId, String token, long expiresIn) {
        this.userId = userId;
        this.token = token;
        this.tokenType = "Bearer";
        this.expiresIn = expiresIn;
    }
}