package com.swapbox.user.DTO;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUpdateRequest {

        @NotBlank(message = "Name is required")
        private String name;

        @NotBlank(message = "Mobile number is required")
        private String mobileNumber;

        @NotBlank(message = "District is required")
        private String district;

        @NotBlank(message = "Mandal is required")
        private String mandal;
}