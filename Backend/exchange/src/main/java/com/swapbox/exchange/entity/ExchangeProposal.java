package com.swapbox.exchange.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "exchange_proposals")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExchangeProposal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long requesterId;

    @Column(nullable = false)
    private Long ownerId;

    @Column(nullable = false)
    private Long requestedResourceId;

    private Long offeredResourceId; // Optional: Can exchange resource for credit

    private Integer creditOffered; // Optional: Can offer credits instead of resource

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ExchangeStatus status;

    private String note;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = ExchangeStatus.PENDING;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}