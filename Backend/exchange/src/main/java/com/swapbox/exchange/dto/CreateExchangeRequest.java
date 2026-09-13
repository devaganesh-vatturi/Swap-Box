package com.swapbox.exchange.dto;


import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateExchangeRequest {

    @NotNull(message = "Requested Resource ID is required")
    private Long requestedResourceId;

    private Integer creditOffered;

    private String note;
}