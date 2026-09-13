package com.swapbox.exchange.client;

import com.swapbox.exchange.dto.ResourceResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "RESOURCES")
public interface ResourceServiceClient {

    @GetMapping("/resources/{id}")
    ResourceResponse getResourceById(@PathVariable("id") Long id);
}