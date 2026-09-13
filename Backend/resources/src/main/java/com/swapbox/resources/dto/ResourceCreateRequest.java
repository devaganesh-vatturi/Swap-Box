package com.swapbox.resources.dto;

import com.swapbox.resources.model.ResourceCategory;
import com.swapbox.resources.model.ResourceType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResourceCreateRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Resource type is required")
    private ResourceType type;

    @NotNull(message = "Category is required")
    private ResourceCategory category;

    @NotNull(message = "Credit value is required")
    @Min(value = 1, message = "Credit value must be at least 1")
    private Integer creditValue;


    @NotBlank(message = "District is required")
    private String district;

    @NotBlank(message = "Mandal is required")
    private String mandal;
}