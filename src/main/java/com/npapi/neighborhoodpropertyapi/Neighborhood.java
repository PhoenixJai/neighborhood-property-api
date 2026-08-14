package com.npapi.neighborhoodpropertyapi;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.*;

@Entity
@Table(name = "neighborhood")
public class Neighborhood {

    @Id
    @Column(name = "neighborhood_id")
    private Integer neighborhoodId;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @JdbcTypeCode(SqlTypes.CHAR)
    @Column(name = "state", nullable = false, columnDefinition = "CHAR(2)")
    private String state;

    @Column(name = "hasHOA", nullable = false)
    private Boolean hasHOA;

    public Neighborhood() {}

    public Integer getNeighborhoodId() { return neighborhoodId; }
    public void setNeighborhoodId(Integer neighborhoodId) { this.neighborhoodId = neighborhoodId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public Boolean getHasHOA() { return hasHOA; }
    public void setHasHOA(Boolean hasHOA) { this.hasHOA = hasHOA; }
}