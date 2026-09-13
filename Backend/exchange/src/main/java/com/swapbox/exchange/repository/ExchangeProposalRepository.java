package com.swapbox.exchange.repository;

import com.swapbox.exchange.entity.ExchangeProposal;
import com.swapbox.exchange.entity.ExchangeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExchangeProposalRepository extends JpaRepository<ExchangeProposal, Long> {
    List<ExchangeProposal> findByRequesterIdOrderByCreatedAtDesc(Long requesterId);
    List<ExchangeProposal> findByRequesterIdAndStatusOrderByCreatedAtDesc(
            Long requesterId,
            ExchangeStatus status
    );
            List<ExchangeProposal> findByOwnerIdOrderByCreatedAtDesc(Long ownerId);
    List<ExchangeProposal> findByOwnerIdAndStatusOrderByCreatedAtDesc(
            Long ownerId,
            ExchangeStatus status
    );
    List<ExchangeProposal> findByRequestedResourceIdAndStatus(Long requestedResourceId, ExchangeStatus status);
}