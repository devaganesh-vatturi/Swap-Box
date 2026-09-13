package com.swapbox.resources.entity;


import com.swapbox.resources.model.ResourceCategory;
import com.swapbox.resources.model.ResourceType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "resources")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resource {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long ownerId;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ResourceCategory category;

    @Column(nullable = false)
    private Integer creditValue;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ResourceType type;

    @Column(nullable = false)
    private String district;

    @Column(nullable = false)
    private String mandal;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ResourceStatus status;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = ResourceStatus.AVAILABLE;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}