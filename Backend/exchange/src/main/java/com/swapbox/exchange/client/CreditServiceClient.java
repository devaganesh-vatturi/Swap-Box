package com.swapbox.exchange.client;

import com.swapbox.exchange.dto.AddCreditRequest;
import com.swapbox.exchange.dto.DeductCreditRequest;
import com.swapbox.exchange.dto.TransferCreditRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "CREDITS")
public interface CreditServiceClient {

    @PostMapping("/credits/deduct")
    void deductCredits(@RequestHeader("X-User-Id") Long userId, @RequestBody DeductCreditRequest request);

    @PostMapping("/credits/add")
    void addCredits(@RequestHeader("X-User-Id") Long userId, @RequestBody AddCreditRequest request);

    @PostMapping("/credits/transfer")
    void transferCredits(@RequestHeader("X-User-Id") Long senderUserId, @RequestBody TransferCreditRequest request);
}