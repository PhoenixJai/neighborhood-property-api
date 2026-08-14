package com.npapi.neighborhoodpropertyapi;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class NeighborhoodRepositoryTest {

    @Autowired
    private NeighborhoodRepository neighborhoodRepository;

    @Test
    void findAll_returnsAllSixSeededNeighborhoods() {
        List<Neighborhood> all = neighborhoodRepository.findAll();
        assertThat(all).hasSize(6);
    }

    @Test
    void findById_returnsCorrectNeighborhood() {
        Optional<Neighborhood> result = neighborhoodRepository.findById(1);
        assertThat(result).isPresent();
        assertThat(result.get().getName()).isEqualTo("Trolley Square");
        assertThat(result.get().getState()).isEqualTo("DE");
        assertThat(result.get().getHasHOA()).isTrue();
    }

    @Test
    void save_persistsNewNeighborhood() {
        Neighborhood newNeighborhood = new Neighborhood();
        newNeighborhood.setNeighborhoodId(999);
        newNeighborhood.setName("Test Neighborhood");
        newNeighborhood.setState("XX");
        newNeighborhood.setHasHOA(false);

        Neighborhood saved = neighborhoodRepository.save(newNeighborhood);

        assertThat(saved.getNeighborhoodId()).isEqualTo(999);

        Optional<Neighborhood> found = neighborhoodRepository.findById(999);
        assertThat(found).isPresent();
        assertThat(found.get().getName()).isEqualTo("Test Neighborhood");

        // Clean up so this test doesn't leave permanent junk in listdetail_dev
        neighborhoodRepository.deleteById(999);
    }

}