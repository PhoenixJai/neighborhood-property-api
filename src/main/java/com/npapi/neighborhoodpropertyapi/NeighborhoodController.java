package com.npapi.neighborhoodpropertyapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/neighborhoods")
public class NeighborhoodController {

    @Autowired
    private NeighborhoodService neighborhoodService;

    @GetMapping
    public List<Neighborhood> getAllNeighborhoods() {
        return neighborhoodService.getAllNeighborhoods();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Neighborhood> getNeighborhoodById(@PathVariable Integer id) {
        Optional<Neighborhood> neighborhood = neighborhoodService.getNeighborhoodById(id);
        return neighborhood.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Neighborhood> createNeighborhood(@RequestBody Neighborhood neighborhood) {
        Neighborhood created = neighborhoodService.createNeighborhood(neighborhood);
        return ResponseEntity.status(201).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Neighborhood> updateNeighborhood(@PathVariable Integer id, @RequestBody Neighborhood neighborhood) {
        Optional<Neighborhood> existing = neighborhoodService.getNeighborhoodById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Neighborhood updated = neighborhoodService.updateNeighborhood(id, neighborhood);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNeighborhood(@PathVariable Integer id) {
        Optional<Neighborhood> existing = neighborhoodService.getNeighborhoodById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        neighborhoodService.deleteNeighborhood(id);
        return ResponseEntity.noContent().build();
    }
}