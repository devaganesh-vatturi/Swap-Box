package com.swapbox.credits.service;

import com.swapbox.credits.dto.*;
import com.swapbox.credits.entity.CreditTransaction;
import com.swapbox.credits.entity.TransactionType;
import com.swapbox.credits.entity.UserCredit;
import com.swapbox.credits.exception.InsufficientBalanceException;
import com.swapbox.credits.exception.ResourceNotFoundException;
import com.swapbox.credits.repository.CreditTransactionRepository;
import com.swapbox.credits.repository.UserCreditRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CreditService {

    private final UserCreditRepository userCreditRepository;
    private final CreditTransactionRepository creditTransactionRepository;

    @Transactional
    public CreditBalanceResponse getOrInitialize(Long userId) {
        UserCredit userCredit = userCreditRepository.findByUserId(userId)
                .orElseGet(() -> userCreditRepository.save(
                        UserCredit.builder()
                                .userId(userId)
                                .balance(100)
                                .build()
                ));
        return mapToBalanceResponse(userCredit);
    }


    @Transactional
    public CreditBalanceResponse addCredits(Long userId, AddCreditRequest request) {
        UserCredit userCredit = userCreditRepository.findByUserId(userId)
                .orElseGet(() -> userCreditRepository.save(
                        UserCredit.builder().userId(userId).balance(0).build()
                ));

        userCredit.setBalance(userCredit.getBalance() + request.getAmount());
        UserCredit savedCredit = userCreditRepository.save(userCredit);

        recordTransaction(userId, request.getAmount(), TransactionType.CREDIT,
                request.getDescription() != null ? request.getDescription() : "Added credits");

        return mapToBalanceResponse(savedCredit);
    }

    @Transactional
    public CreditBalanceResponse deductCredits(Long userId, DeductCreditRequest request) {
        UserCredit userCredit = userCreditRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Credit wallet not found for User ID: " + userId));

        if (userCredit.getBalance() < request.getAmount()) {
            throw new InsufficientBalanceException("Insufficient credit balance");
        }

        userCredit.setBalance(userCredit.getBalance() - request.getAmount());
        UserCredit savedCredit = userCreditRepository.save(userCredit);

        recordTransaction(userId, request.getAmount(), TransactionType.DEBIT,
                request.getDescription() != null ? request.getDescription() : "Deducted credits");

        return mapToBalanceResponse(savedCredit);
    }

    @Transactional
    public void transferCredits(Long fromUserId, TransferCreditRequest request) {
        if (fromUserId.equals(request.getToUserId())) {
            throw new IllegalArgumentException("Cannot transfer credits to yourself");
        }

        UserCredit sender = userCreditRepository.findByUserId(fromUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Sender credit wallet not found"));

        if (sender.getBalance() < request.getAmount()) {
            throw new InsufficientBalanceException("Insufficient credit balance for transfer");
        }

        UserCredit recipient = userCreditRepository.findByUserId(request.getToUserId())
                .orElseGet(() -> userCreditRepository.save(
                        UserCredit.builder().userId(request.getToUserId()).balance(0).build()
                ));

        sender.setBalance(sender.getBalance() - request.getAmount());
        recipient.setBalance(recipient.getBalance() + request.getAmount());

        userCreditRepository.save(sender);
        userCreditRepository.save(recipient);

        recordTransaction(fromUserId, request.getAmount(), TransactionType.DEBIT,
                "Transferred to User ID: " + request.getToUserId());
        recordTransaction(request.getToUserId(), request.getAmount(), TransactionType.CREDIT,
                "Received from User ID: " + fromUserId);
    }

    @Transactional(readOnly = true)
    public List<CreditTransactionResponse> getTransactionHistory(Long userId) {
        return creditTransactionRepository.findByUserId(userId).stream()
                .map(this::mapToTransactionResponse)
                .collect(Collectors.toList());
    }

    private void recordTransaction(Long userId, Integer amount, TransactionType type, String description) {
        CreditTransaction transaction = CreditTransaction.builder()
                .userId(userId)
                .amount(amount)
                .type(type)
                .description(description)
                .build();
        creditTransactionRepository.save(transaction);
    }

    private CreditBalanceResponse mapToBalanceResponse(UserCredit userCredit) {
        return CreditBalanceResponse.builder()
                .id(userCredit.getId())
                .userId(userCredit.getUserId())
                .balance(userCredit.getBalance())
                .build();
    }

    private CreditTransactionResponse mapToTransactionResponse(CreditTransaction transaction) {
        return CreditTransactionResponse.builder()
                .id(transaction.getId())
                .userId(transaction.getUserId())
                .amount(transaction.getAmount())
                .type(transaction.getType())
                .description(transaction.getDescription())
                .createdAt(transaction.getCreatedAt())
                .build();
    }
}