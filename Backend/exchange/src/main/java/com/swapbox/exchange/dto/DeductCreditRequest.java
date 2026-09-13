package com.swapbox.exchange.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeductCreditRequest {
    private Long userId;
    private Integer amount;
    private String description;
    private Long referenceExchangeId;
}