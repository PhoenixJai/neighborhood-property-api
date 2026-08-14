package com.npapi.neighborhoodpropertyapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class ExportController {

    @Autowired
    private NeighborhoodRepository neighborhoodRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @GetMapping("/export")
    public Map<String, Object> exportAllData() {
        List<Neighborhood> neighborhoods = neighborhoodRepository.findAll();
        List<Property> properties = propertyRepository.findAll();

        return Map.of(
                "neighborhoods", neighborhoods,
                "properties", properties
        );
    }
}