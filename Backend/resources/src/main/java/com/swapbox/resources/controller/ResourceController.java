package com.swapbox.resources.controller;

import com.swapbox.resources.dto.*;
import com.swapbox.resources.model.ResourceCategory;
import com.swapbox.resources.model.ResourceType;
import com.swapbox.resources.service.ResourceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/resources")
@RequiredArgsConstructor
public class ResourceController {

    private final ResourceService resourceService;

    @PostMapping("/create")
    public ResponseEntity<ResourceResponse> createResource(
            @Valid @RequestBody ResourceCreateRequest request,
            @RequestHeader("X-User-Id") Long userId) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(resourceService.createResource(userId, request));
    }

    @GetMapping("/test")
    public String test() {
        return "USER SERVICE REACHED";
    }

    // Get available items from other users
    @GetMapping("/things")
    public ResponseEntity<List<ResourceResponse>> getItems(
            @RequestHeader("X-User-Id") Long userId,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String mandal,
            @RequestParam(required = false) ResourceCategory category) {

        return ResponseEntity.ok(
                resourceService.getResources(
                        userId,
                        ResourceType.ITEM,
                        district,
                        mandal,
                        category
                )
        );
    }

    // Get available skills from other users
    @GetMapping("/skills")
    public ResponseEntity<List<ResourceResponse>> getSkills(
            @RequestHeader("X-User-Id") Long userId,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String mandal,
            @RequestParam(required = false) ResourceCategory category) {

        return ResponseEntity.ok(
                resourceService.getResources(
                        userId,
                        ResourceType.SKILL,
                        district,
                        mandal,
                        category
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResourceResponse> getResourceById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                resourceService.getResourceById(id)
        );
    }

    @GetMapping("/my-resources")
    public ResponseEntity<List<ResourceResponse>> getMyResources(
            @RequestHeader("X-User-Id") Long userId) {

        return ResponseEntity.ok(
                resourceService.getResourcesByOwner(userId)
        );
    }
    @GetMapping("/my-skills")
    public ResponseEntity<List<ResourceResponse>> getMySkills(
            @RequestHeader("X-User-Id") Long userId) {

        return ResponseEntity.ok(
                resourceService.getResourcesByOwnerAndType(
                        userId,
                        ResourceType.SKILL
                )
        );
    }


    @GetMapping("/my-things")
    public ResponseEntity<List<ResourceResponse>> getMyThings(
            @RequestHeader("X-User-Id") Long userId) {

        return ResponseEntity.ok(
                resourceService.getResourcesByOwnerAndType(
                        userId,
                        ResourceType.ITEM
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResourceResponse> updateResource(
            @PathVariable Long id,
            @Valid @RequestBody ResourceUpdateRequest request,
            @RequestHeader("X-User-Id") Long userId) {

        return ResponseEntity.ok(
                resourceService.updateResource(id, userId, request)
        );
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ResourceResponse> updateResourceStatus(
            @PathVariable Long id,
            @Valid @RequestBody ResourceStatusUpdateRequest request) {

        return ResponseEntity.ok(
                resourceService.updateResourceStatus(
                        id,
                        request.getStatus()
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResource(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") Long userId) {

        resourceService.deleteResource(id, userId);

        return ResponseEntity.noContent().build();
    }
}