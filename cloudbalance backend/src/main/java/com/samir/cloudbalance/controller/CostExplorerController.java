package com.samir.cloudbalance.controller;

import com.samir.cloudbalance.dto.CostExplorerFilterResponseDto;
import com.samir.cloudbalance.dto.CostExplorerRequestDto;
import com.samir.cloudbalance.dto.CostExplorerResponseDto;
import com.samir.cloudbalance.services.CostExplorerService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/cost-explorer")
public class CostExplorerController {

    private final CostExplorerService service;

    public CostExplorerController(CostExplorerService service) {
        this.service = service;
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping
    public void getalldata(){
        service.getalldata();
    }

    @PreAuthorize("hasRole('Admin')")
    @PostMapping
    public List<CostExplorerResponseDto> getCostData(
           @Valid @RequestBody CostExplorerRequestDto request
    ) {
        return service.fetchCostData(request);
    }

    @GetMapping("/filters")
    public ResponseEntity<CostExplorerFilterResponseDto> getFilters() {
        return ResponseEntity.ok(service.fetchAvailableFilters());
    }

}
