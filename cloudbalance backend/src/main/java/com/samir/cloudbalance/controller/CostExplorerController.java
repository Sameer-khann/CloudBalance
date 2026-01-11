package com.samir.cloudbalance.controller;

import com.samir.cloudbalance.dto.request.CostExplorerRequestDto;
import com.samir.cloudbalance.dto.response.CostExplorerResponseDto;
import com.samir.cloudbalance.service.CostExplorerService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cost-explorer")
public class CostExplorerController {

    private final CostExplorerService service;

    public CostExplorerController(CostExplorerService service) {
        this.service = service;
    }

    @GetMapping
    public void getalldata(){
        service.getalldata();
    }

//    @PreAuthorize("hasRole('Admin')")
    @PostMapping
    public List<CostExplorerResponseDto> getCostData(
            @RequestBody CostExplorerRequestDto request
    ) {
        return service.fetchCostData(request);
    }
}
