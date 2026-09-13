package com.swapbox.credits.dto;


import com.swapbox.credits.entity.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreditTransactionResponse {
    private Long id;
    private Long userId;
    private Integer amount;
    private TransactionType type;
    private String description;
    private Long referenceExchangeId;
    private LocalDateTime createdAt;
}