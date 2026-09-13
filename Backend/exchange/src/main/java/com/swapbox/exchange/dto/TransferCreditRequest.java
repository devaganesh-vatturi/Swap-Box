package com.swapbox.exchange.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransferCreditRequest {
    private Long toUserId;
    private Integer amount;
    private Long referenceExchangeId;
}