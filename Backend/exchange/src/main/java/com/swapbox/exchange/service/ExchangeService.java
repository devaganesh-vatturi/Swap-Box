package com.swapbox.exchange.service;

import com.swapbox.exchange.client.CreditServiceClient;
import com.swapbox.exchange.client.ResourceServiceClient;
import com.swapbox.exchange.dto.*;
import com.swapbox.exchange.entity.ExchangeProposal;
import com.swapbox.exchange.entity.ExchangeStatus;
import com.swapbox.exchange.exception.InvalidExchangeOperationException;
import com.swapbox.exchange.exception.ResourceNotFoundException;
import com.swapbox.exchange.repository.ExchangeProposalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExchangeService {

    private final ExchangeProposalRepository proposalRepository;
    private final ResourceServiceClient resourceServiceClient;
    private final CreditServiceClient creditServiceClient;

    public ExchangeResponse createProposal(Long requesterId, CreateExchangeRequest request) {

        ResourceResponse requestedResource =
                resourceServiceClient.getResourceById(request.getRequestedResourceId());

        System.out.println(requestedResource);

        if (requestedResource == null) {
            throw new ResourceNotFoundException("Requested resource not found");
        }

        if (requestedResource.getOwnerId().equals(requesterId)) {
            throw new InvalidExchangeOperationException(
                    "Cannot request an exchange for your own resource"
            );
        }

        if (!"AVAILABLE".equalsIgnoreCase(requestedResource.getStatus())) {
            throw new InvalidExchangeOperationException(
                    "Requested resource is not available for exchange"
            );
        }

        ExchangeProposal proposal = ExchangeProposal.builder()
                .requesterId(requesterId)
                .ownerId(requestedResource.getOwnerId())
                .requestedResourceId(request.getRequestedResourceId())
                .creditOffered(
                        request.getCreditOffered() != null
                                ? request.getCreditOffered()
                                : requestedResource.getCreditValue()
                )
                .note(request.getNote())
                .status(ExchangeStatus.PENDING)
                .build();

        ExchangeProposal saved = proposalRepository.save(proposal);

        return mapToResponse(saved);
    }
    @Transactional(readOnly = true)
    public List<ExchangeResponse> getSentProposals(
            Long requesterId,
            ExchangeStatus status) {

        if (status == null) {
            return proposalRepository
                    .findByRequesterIdOrderByCreatedAtDesc(requesterId)
                    .stream()
                    .map(this::mapToResponse)
                    .collect(Collectors.toList());
        }

        return proposalRepository
                .findByRequesterIdAndStatusOrderByCreatedAtDesc(
                        requesterId,
                        status
                )
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ExchangeResponse> getReceivedProposals(
            Long ownerId,
            ExchangeStatus status) {

        List<ExchangeProposal> proposals;

        if (status == null) {
            proposals = proposalRepository
                    .findByOwnerIdOrderByCreatedAtDesc(ownerId);
        } else {
            proposals = proposalRepository
                    .findByOwnerIdAndStatusOrderByCreatedAtDesc(ownerId, status);
        }

        return proposals.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ExchangeResponse updateProposalStatus(Long userId, Long proposalId, UpdateStatusRequest request) {
        ExchangeProposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new ResourceNotFoundException("Exchange proposal not found with id: " + proposalId));

        if (request.getStatus() == ExchangeStatus.ACCEPTED || request.getStatus() == ExchangeStatus.REJECTED) {
            if (!proposal.getOwnerId().equals(userId)) {
                throw new InvalidExchangeOperationException("Only the resource owner can accept or reject a proposal");
            }
        } else if (request.getStatus() == ExchangeStatus.CANCELLED) {
            if (!proposal.getRequesterId().equals(userId)) {
                throw new InvalidExchangeOperationException("Only the requester can cancel a proposal");
            }
        } else if (request.getStatus() == ExchangeStatus.COMPLETED) {
            if (!proposal.getOwnerId().equals(userId) && !proposal.getRequesterId().equals(userId)) {
                throw new InvalidExchangeOperationException("Unauthorized to complete this proposal");
            }
        }

        if (proposal.getStatus() != ExchangeStatus.PENDING && request.getStatus() != ExchangeStatus.COMPLETED) {
            throw new InvalidExchangeOperationException("Cannot change status of a proposal that is already " + proposal.getStatus());
        }

        if (request.getStatus() == ExchangeStatus.ACCEPTED && proposal.getCreditOffered() != null && proposal.getCreditOffered() > 0) {
            creditServiceClient.transferCredits(
                    proposal.getRequesterId(),
                    TransferCreditRequest.builder()
                            .toUserId(proposal.getOwnerId())
                            .amount(proposal.getCreditOffered())
                            .referenceExchangeId(proposal.getId())
                            .build()
            );
        }

        proposal.setStatus(request.getStatus());
        ExchangeProposal updated = proposalRepository.save(proposal);
        return mapToResponse(updated);
    }

    private ExchangeResponse mapToResponse(ExchangeProposal proposal) {
        return ExchangeResponse.builder()
                .id(proposal.getId())
                .requesterId(proposal.getRequesterId())
                .ownerId(proposal.getOwnerId())
                .requestedResourceId(proposal.getRequestedResourceId())
                .offeredResourceId(proposal.getOfferedResourceId())
                .creditOffered(proposal.getCreditOffered())
                .status(proposal.getStatus())
                .note(proposal.getNote())
                .createdAt(proposal.getCreatedAt())
                .updatedAt(proposal.getUpdatedAt())
                .build();
    }
}