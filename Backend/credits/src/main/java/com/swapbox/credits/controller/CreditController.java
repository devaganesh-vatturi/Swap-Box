package com.swapbox.credits.controller;

import com.swapbox.credits.dto.*;
import com.swapbox.credits.service.CreditService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/credits")
@RequiredArgsConstructor
public class CreditController {

    private final CreditService creditService;


    @GetMapping("/balance")
    public ResponseEntity<CreditBalanceResponse> getBalance(@RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(creditService.getOrInitialize(userId));
    }

    @PostMapping("/add")
    public ResponseEntity<CreditBalanceResponse> addCredits(
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody AddCreditRequest request) {
        return ResponseEntity.ok(creditService.addCredits(userId, request));
    }

    @PostMapping("/deduct")
    public ResponseEntity<CreditBalanceResponse> deductCredits(
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody DeductCreditRequest request) {
        return ResponseEntity.ok(creditService.deductCredits(userId, request));
    }

    @PostMapping("/transfer")
    public ResponseEntity<Void> transferCredits(
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody TransferCreditRequest request) {
        creditService.transferCredits(userId, request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/history")
    public ResponseEntity<List<CreditTransactionResponse>> getHistory(@RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(creditService.getTransactionHistory(userId));
    }
}