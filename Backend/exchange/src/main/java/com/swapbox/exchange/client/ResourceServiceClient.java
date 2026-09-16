package com.swapbox.exchange.client;

import com.swapbox.exchange.dto.ResourceResponse;
import com.swapbox.exchange.dto.ResourceStatusUpdate;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "RESOURCES")
public interface ResourceServiceClient {

    @GetMapping("/resources/{id}")
    ResourceResponse getResourceById(@PathVariable("id") Long id);

    @PutMapping("/resources/{id}/status")
    ResourceResponse changeStatus(@PathVariable("id") Long id, @RequestBody ResourceStatusUpdate Status);


}