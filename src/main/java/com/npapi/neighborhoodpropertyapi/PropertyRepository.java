package com.npapi.neighborhoodpropertyapi;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Integer> {

    List<Property> findByNeighborhood_NeighborhoodId(Integer neighborhoodId);
}