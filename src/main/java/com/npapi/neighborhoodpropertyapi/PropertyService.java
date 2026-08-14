package com.npapi.neighborhoodpropertyapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Optional<Property> getPropertyById(Integer id) {
        return propertyRepository.findById(id);
    }

    public List<Property> getPropertiesByNeighborhoodId(Integer neighborhoodId) {
    return propertyRepository.findByNeighborhood_NeighborhoodId(neighborhoodId);
    }

    public Property createProperty(Property property) {
        if (isDuplicate(property, null)) {
            throw new DuplicatePropertyException(
                "A property already exists at " + property.getAddress() + ", "
                + property.getCity() + ", " + property.getState() + " " + property.getZipcode()
            );
        }
        return propertyRepository.save(property);
    }

    public Property updateProperty(Integer id, Property updated) {
        if (isDuplicate(updated, id)) {
            throw new DuplicatePropertyException(
                "A property already exists at " + updated.getAddress() + ", "
                + updated.getCity() + ", " + updated.getState() + " " + updated.getZipcode()
            );
        }
        updated.setPropertyId(id);
        return propertyRepository.save(updated);
    }

    public void deleteProperty(Integer id) {
        propertyRepository.deleteById(id);
    }

    private boolean isDuplicate(Property candidate, Integer excludeId) {
        return propertyRepository.findAll().stream()
                .anyMatch(p ->
                        !p.getPropertyId().equals(excludeId)
                        && p.getAddress().equalsIgnoreCase(candidate.getAddress())
                        && p.getCity().equalsIgnoreCase(candidate.getCity())
                        && p.getState().equalsIgnoreCase(candidate.getState())
                        && p.getZipcode().equals(candidate.getZipcode())
                );
    }
}