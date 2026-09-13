package com.swapbox.exchange.dto;


import com.swapbox.exchange.entity.ExchangeStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateStatusRequest {

    @NotNull(message = "Status is required")
    private ExchangeStatus status;
}