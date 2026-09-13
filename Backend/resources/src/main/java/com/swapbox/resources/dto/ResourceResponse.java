package com.swapbox.resources.dto;


import com.swapbox.resources.entity.ResourceStatus;
import com.swapbox.resources.model.ResourceCategory;
import com.swapbox.resources.model.ResourceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResourceResponse {

    private Long id;
    private Long ownerId;
    private String title;
    private String description;
    private ResourceType type;
    private ResourceCategory category;
    private Integer creditValue;
    private String district;
    private String mandal;
    private ResourceStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}