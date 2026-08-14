package com.npapi.neighborhoodpropertyapi;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class PropertyRepositoryTest {

    @Autowired
    private PropertyRepository propertyRepository;
    @Autowired
    private NeighborhoodRepository neighborhoodRepository;

    @Test
    void findAll_returnsAllSixtySeededProperties() {
        List<Property> all = propertyRepository.findAll();
        assertThat(all).hasSize(60);
    }

    @Test
    void findById_returnsCorrectProperty() {
        Optional<Property> result = propertyRepository.findById(1);
        assertThat(result).isPresent();
        assertThat(result.get().getAddress()).isEqualTo("101 Delaware Ave");
        assertThat(result.get().getCity()).isEqualTo("Wilmington");
        assertThat(result.get().getState()).isEqualTo("DE");
        assertThat(result.get().getZipcode()).isEqualTo("19806");
    }

    @Test
    void findByNeighborhoodId_returnsTenPropertiesForNeighborhoodOne() {
        List<Property> properties = propertyRepository.findByNeighborhood_NeighborhoodId(1);
        assertThat(properties).hasSize(10);
        assertThat(properties).allMatch(p -> p.getNeighborhood().getNeighborhoodId().equals(1));
    }

    @Test
    void save_persistsNewProperty() {
        Property newProperty = new Property();
        Neighborhood neighborhood = neighborhoodRepository.findById(1).orElseThrow();
        newProperty.setPropertyId(999);
        newProperty.setNeighborhood(neighborhood);
        newProperty.setAddress("999 Test St");
        newProperty.setCity("Test City");
        newProperty.setState("XX");
        newProperty.setZipcode("00000");
        newProperty.setValue(100000);

        Property saved = propertyRepository.save(newProperty);
        assertThat(saved.getPropertyId()).isEqualTo(999);

        Optional<Property> found = propertyRepository.findById(999);
        assertThat(found).isPresent();
        assertThat(found.get().getAddress()).isEqualTo("999 Test St");

        propertyRepository.deleteById(999);
    }
}