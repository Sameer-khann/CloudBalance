package com.samir.cloudbalance.dto.request;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class CostExplorerRequestDto {

    private LocalDate startDate;
    private LocalDate endDate;

    private String groupBy;

    private List<String> service;
    private List<String> accountId;
    private List<String> instanceType;
    private List<String> usageType;
    private List<String> platform;
    private List<String> region;
    private List<String> usageTypeGroup;
    private List<String> purchaseOption;
    private List<String> apiOperation;
    private List<String> resource;
    private List<String> chargeType;
    private List<String> availabilityZone;
    private List<String> tenancy;
    private List<String> legalEntity;
    private List<String> billingEntity;
}
