package com.npapi.neighborhoodpropertyapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NeighborhoodService {

    @Autowired
    private NeighborhoodRepository neighborhoodRepository;

    public List<Neighborhood> getAllNeighborhoods() {
        return neighborhoodRepository.findAll();
    }

    public Optional<Neighborhood> getNeighborhoodById(Integer id) {
        return neighborhoodRepository.findById(id);
    }

    public Neighborhood createNeighborhood(Neighborhood neighborhood) {
        return neighborhoodRepository.save(neighborhood);
    }

    public Neighborhood updateNeighborhood(Integer id, Neighborhood updated) {
        updated.setNeighborhoodId(id);
        return neighborhoodRepository.save(updated);
    }

    public void deleteNeighborhood(Integer id) {
        neighborhoodRepository.deleteById(id);
    }
}