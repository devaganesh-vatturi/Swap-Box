package com.swapbox.resources.dto;


import com.swapbox.resources.entity.ResourceStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResourceStatusUpdateRequest {

    @NotNull(message = "Status is required")
    private ResourceStatus status;
}