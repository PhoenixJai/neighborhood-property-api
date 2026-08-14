package com.npapi.neighborhoodpropertyapi;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "property")
public class Property {

    @Id
    @Column(name = "property_id")
    private Integer propertyId;

    @ManyToOne
    @JoinColumn(name = "neighborhood_id", nullable = false)
    private Neighborhood neighborhood;

    @Column(name = "address", nullable = false, length = 100)
    private String address;

    @Column(name = "city", nullable = false, length = 100)
    private String city;

    @JdbcTypeCode(SqlTypes.CHAR)
    @Column(name = "state", nullable = false, columnDefinition = "CHAR(2)")
    private String state;

    @JdbcTypeCode(SqlTypes.CHAR)
    @Column(name = "zipcode", nullable = false, columnDefinition = "CHAR(5)")
    private String zipcode;

    @Column(name = "value", nullable = false)
    private Integer value;

    public Property() {}

    public Integer getPropertyId() { return propertyId; }
    public void setPropertyId(Integer propertyId) { this.propertyId = propertyId; }

    public Neighborhood getNeighborhood() { return neighborhood; }
    public void setNeighborhood(Neighborhood neighborhood) { this.neighborhood = neighborhood; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getZipcode() { return zipcode; }
    public void setZipcode(String zipcode) { this.zipcode = zipcode; }

    public Integer getValue() { return value; }
    public void setValue(Integer value) { this.value = value; }
}