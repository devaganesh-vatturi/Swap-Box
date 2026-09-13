package com.swapbox.exchange.dto;


import lombok.Data;

@Data
public class ResourceResponse {
    private Long id;
    private String title;
    private Long ownerId;
    private Integer creditValue;
    private String status;
}