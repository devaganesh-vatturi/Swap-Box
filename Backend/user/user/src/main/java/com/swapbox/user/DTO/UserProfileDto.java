package com.swapbox.user.DTO;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDto {

    private Long id;
    private String name;
    private String email;
    private String mobileNumber;
    private String district;
    private String mandal;
    private LocalDateTime createdAt;
}