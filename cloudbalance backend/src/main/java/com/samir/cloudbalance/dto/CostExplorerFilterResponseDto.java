package com.samir.cloudbalance.dto;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class CostExplorerFilterResponseDto {

    private Map<String, List<String>> filters;
}