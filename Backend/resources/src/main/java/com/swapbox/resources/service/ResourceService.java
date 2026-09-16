package com.swapbox.resources.service;

import com.swapbox.resources.dto.*;
import com.swapbox.resources.entity.Resource;
import com.swapbox.resources.entity.ResourceStatus;
import com.swapbox.resources.exception.ResourceNotFoundException;
import com.swapbox.resources.exception.UnauthorizedAccessException;
import com.swapbox.resources.model.ResourceCategory;
import com.swapbox.resources.model.ResourceType;
import com.swapbox.resources.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResourceService {

    private final ResourceRepository resourceRepository;

    @Transactional
    public ResourceResponse createResource(
            Long ownerId,
            ResourceCreateRequest request) {

        Resource resource = Resource.builder()
                .ownerId(ownerId)
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .type(request.getType())
                .creditValue(request.getCreditValue())
                .district(request.getDistrict())
                .mandal(request.getMandal())
                .status(ResourceStatus.AVAILABLE)
                .build();

        Resource savedResource = resourceRepository.save(resource);

        return mapToResponse(savedResource);
    }

    @Transactional(readOnly = true)
    public List<ResourceResponse> getAllAvailableResources(
            String district,
            String mandal,
            ResourceCategory category) {

        List<Resource> resources;

        if (district != null && mandal != null) {

            resources = resourceRepository.findByDistrictAndMandalAndStatus(
                    district,
                    mandal,
                    ResourceStatus.AVAILABLE
            );

        } else if (district != null) {

            resources = resourceRepository.findByDistrictAndStatus(
                    district,
                    ResourceStatus.AVAILABLE
            );

        } else if (category != null) {

            resources = resourceRepository.findByCategoryAndStatus(
                    category,
                    ResourceStatus.AVAILABLE
            );

        } else {

            resources = resourceRepository.findByStatus(
                    ResourceStatus.AVAILABLE
            );
        }

        return resources.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ResourceResponse> getResources(
            Long ownerId,
            ResourceType type,
            String district,
            String mandal,
            ResourceCategory category) {

        List<Resource> resources;

        if (district != null && mandal != null) {

            resources = resourceRepository
                    .findByTypeAndDistrictAndMandalAndOwnerIdNotAndStatus(
                            type,
                            district,
                            mandal,
                            ownerId,
                            ResourceStatus.AVAILABLE
                    );

        } else if (district != null) {

            resources = resourceRepository
                    .findByTypeAndDistrictAndOwnerIdNotAndStatus(
                            type,
                            district,
                            ownerId,
                            ResourceStatus.AVAILABLE
                    );

        } else if (category != null) {

            resources = resourceRepository
                    .findByTypeAndCategoryAndOwnerIdNotAndStatus(
                            type,
                            category,
                            ownerId,
                            ResourceStatus.AVAILABLE
                    );

        } else {

            resources = resourceRepository
                    .findByTypeAndOwnerIdNotAndStatus(
                            type,
                            ownerId,
                            ResourceStatus.AVAILABLE
                    );
        }

        return resources.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ResourceResponse getResourceById(Long id) {

        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Resource not found with ID: " + id
                        )
                );

        return mapToResponse(resource);
    }

    @Transactional(readOnly = true)
    public List<ResourceResponse> getResourcesByOwner(Long ownerId) {

        return resourceRepository.findByOwnerId(ownerId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<ResourceResponse> getResourcesByOwnerAndType(
            Long ownerId,
            ResourceType type) {

        return resourceRepository
                .findByOwnerIdAndType(ownerId,
                        type
                        )
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ResourceResponse updateResource(
            Long resourceId,
            Long userId,
            ResourceUpdateRequest request) {

        Resource resource = resourceRepository.findById(resourceId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Resource not found with ID: " + resourceId
                        )
                );

        if (!resource.getOwnerId().equals(userId)) {
            throw new UnauthorizedAccessException(
                    "You are not authorized to update this resource"
            );
        }

        resource.setType(request.getType());
        resource.setTitle(request.getTitle());
        resource.setDescription(request.getDescription());
        resource.setCategory(request.getCategory());
        resource.setCreditValue(request.getCreditValue());
        resource.setDistrict(request.getDistrict());
        resource.setMandal(request.getMandal());

        Resource updatedResource = resourceRepository.save(resource);

        return mapToResponse(updatedResource);
    }

    @Transactional
    public ResourceResponse updateResourceStatus(
            Long resourceId,
            ResourceStatus status) {

        Resource resource = resourceRepository.findById(resourceId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Resource not found with ID: " + resourceId
                        )
                );

        resource.setStatus(status);

        Resource updatedResource = resourceRepository.save(resource);

        return mapToResponse(updatedResource);
    }

    @Transactional
    public void deleteResource(
            Long resourceId,
            Long userId) {

        Resource resource = resourceRepository.findById(resourceId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Resource not found with ID: " + resourceId
                        )
                );

        if (!resource.getOwnerId().equals(userId)) {
            throw new UnauthorizedAccessException(
                    "You are not authorized to delete this resource"
            );
        }

        resourceRepository.delete(resource);
    }

    private ResourceResponse mapToResponse(Resource resource) {

        return ResourceResponse.builder()
                .id(resource.getId())
                .ownerId(resource.getOwnerId())
                .title(resource.getTitle())
                .description(resource.getDescription())
                .category(resource.getCategory())
                .type(resource.getType())
                .creditValue(resource.getCreditValue())
                .district(resource.getDistrict())
                .mandal(resource.getMandal())
                .status(resource.getStatus())
                .createdAt(resource.getCreatedAt())
                .updatedAt(resource.getUpdatedAt())
                .build();
    }
}