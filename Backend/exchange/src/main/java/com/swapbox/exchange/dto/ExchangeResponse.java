package com.swapbox.exchange.dto;


import com.swapbox.exchange.entity.ExchangeStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExchangeResponse {
    private Long id;
    private Long requesterId;
    private Long ownerId;
    private String title;
    private Long requestedResourceId;
    private Long offeredResourceId;
    private Integer creditOffered;
    private ExchangeStatus status;
    private String note;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}