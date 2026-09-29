package com.swapbox.exchange.controller;

import com.swapbox.exchange.dto.*;
import com.swapbox.exchange.entity.ExchangeStatus;
import com.swapbox.exchange.service.ExchangeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exchange")
@RequiredArgsConstructor
public class ExchangeController {

    private final ExchangeService exchangeService;

    @PostMapping("/create")
    public ResponseEntity<ExchangeResponse> createProposal(
            @RequestHeader("X-User-Id") Long requesterId,
            @Valid @RequestBody CreateExchangeRequest request) {

        System.out.println(request);
        return new ResponseEntity<>(
                exchangeService.createProposal(requesterId, request),
                HttpStatus.CREATED
        );
    }
    @GetMapping("/test")
    public String test() {
        return "exchange SERVICE REACHED";
    }
    @GetMapping("/sent")
    public ResponseEntity<List<ExchangeResponse>> getSentProposals(
            @RequestHeader("X-User-Id") Long requesterId,
            @RequestParam(required = false) ExchangeStatus status) {

        return ResponseEntity.ok(
                exchangeService.getSentProposals(requesterId, status)
        );
    }

    @GetMapping("/received")
    public ResponseEntity<List<ExchangeResponse>> getReceivedProposals(
            @RequestHeader("X-User-Id") Long ownerId,
            @RequestParam(required = false) ExchangeStatus status) {

        return ResponseEntity.ok(
                exchangeService.getReceivedProposals(ownerId, status)
        );
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ExchangeResponse> updateProposalStatus(
            @RequestHeader("X-User-Id") Long userId,
            @PathVariable("id") Long id,
            @Valid @RequestBody UpdateStatusRequest request) {

        return ResponseEntity.ok(
                exchangeService.updateProposalStatus(userId, id, request)
        );
    }
}