package com.samir.cloudbalance.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;
import jakarta.validation.constraints.*;

@Data
public class CostExplorerRequestDto {

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;

    @NotBlank(message = "Group by field is required")
    @Pattern(
            regexp = "SERVICE|ACCOUNT_ID|REGION|USAGE_TYPE|PLATFORM",
            message = "Invalid groupBy value"
    )
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
