package com.swapbox.credits.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreditBalanceResponse {
    private Long id;
    private Long userId;
    private Integer balance;
    private LocalDateTime updatedAt;
}