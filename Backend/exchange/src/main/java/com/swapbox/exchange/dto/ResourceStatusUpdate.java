package com.swapbox.exchange.dto;

import com.swapbox.exchange.entity.ExchangeStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResourceStatusUpdate {

    @NotNull(message = "Status is required")
    private ResourceStatus status;

}
