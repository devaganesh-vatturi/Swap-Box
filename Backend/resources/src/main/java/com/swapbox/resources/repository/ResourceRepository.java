package com.swapbox.resources.repository;

import com.swapbox.resources.entity.Resource;
import com.swapbox.resources.entity.ResourceStatus;
import com.swapbox.resources.model.ResourceCategory;
import com.swapbox.resources.model.ResourceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {

    List<Resource> findByStatus(ResourceStatus status);

    List<Resource> findByOwnerId(Long ownerId);
    List<Resource> findByOwnerIdAndType(
            Long ownerId,
            ResourceType type

    );
    List<Resource> findByDistrictAndStatus(
            String district,
            ResourceStatus status
    );

    List<Resource> findByDistrictAndMandalAndStatus(
            String district,
            String mandal,
            ResourceStatus status
    );

    List<Resource> findByCategoryAndStatus(
            ResourceCategory category,
            ResourceStatus status
    );

    // Type-based queries excluding current user's resources

    List<Resource> findByTypeAndOwnerIdNotAndStatus(
            ResourceType type,
            Long ownerId,
            ResourceStatus status
    );

    List<Resource> findByTypeAndDistrictAndOwnerIdNotAndStatus(
            ResourceType type,
            String district,
            Long ownerId,
            ResourceStatus status
    );

    List<Resource> findByTypeAndDistrictAndMandalAndOwnerIdNotAndStatus(
            ResourceType type,
            String district,
            String mandal,
            Long ownerId,
            ResourceStatus status
    );

    List<Resource> findByTypeAndCategoryAndOwnerIdNotAndStatus(
            ResourceType type,
            ResourceCategory category,
            Long ownerId,
            ResourceStatus status
    );
}