package com.npapi.neighborhoodpropertyapi;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @GetMapping("/properties")
        public List<PropertyResponseDTO> getAllProperties() {
        return propertyService.getAllProperties().stream()
        .map(PropertyResponseDTO::new)
        .toList();
    }

    @GetMapping("/properties/{id}")
        public ResponseEntity<PropertyResponseDTO> getPropertyById(@PathVariable Integer id) {
        Optional<Property> property = propertyService.getPropertyById(id);
        return property.map(p -> ResponseEntity.ok(new PropertyResponseDTO(p)))
        .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/neighborhoods/{neighborhoodId}/properties")
        public List<PropertyResponseDTO> getPropertiesByNeighborhood(@PathVariable Integer neighborhoodId) {
        return propertyService.getPropertiesByNeighborhoodId(neighborhoodId).stream()
        .map(PropertyResponseDTO::new)
        .toList();
}

    @PostMapping("/properties")
    public ResponseEntity<?> createProperty(@RequestBody Property property) {
        try {
            Property created = propertyService.createProperty(property);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (DuplicatePropertyException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PutMapping("/properties/{id}")
    public ResponseEntity<?> updateProperty(@PathVariable Integer id, @RequestBody Property property) {
        Optional<Property> existing = propertyService.getPropertyById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        try {
            Property updated = propertyService.updateProperty(id, property);
            return ResponseEntity.ok(updated);
        } catch (DuplicatePropertyException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @DeleteMapping("/properties/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Integer id) {
        Optional<Property> existing = propertyService.getPropertyById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        propertyService.deleteProperty(id);
        return ResponseEntity.noContent().build();
    }
}