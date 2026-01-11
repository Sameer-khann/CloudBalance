package com.samir.cloudbalance.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
public class CostExplorerResponseDto {

    private String groupKey; // service / account / region etc
    private Map<String, Double> monthlyCost; // Jul → Dec
}
