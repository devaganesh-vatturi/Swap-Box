package com.swapbox.user.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserContactDto {

    private Long userId;
    private String name;
    private String email;
    private String mobileNumber;
}