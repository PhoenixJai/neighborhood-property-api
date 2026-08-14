package com.npapi.neighborhoodpropertyapi;

public class PropertyResponseDTO {

    private Integer propertyId;
    private Integer neighborhoodId;
    private String neighborhoodName;
    private String address;
    private String city;
    private String state;
    private String zipcode;
    private Integer value;

    public PropertyResponseDTO() {}

    public PropertyResponseDTO(Property property) {
        this.propertyId = property.getPropertyId();
        this.neighborhoodId = property.getNeighborhood().getNeighborhoodId();
        this.neighborhoodName = property.getNeighborhood().getName();
        this.address = property.getAddress();
        this.city = property.getCity();
        this.state = property.getState();
        this.zipcode = property.getZipcode();
        this.value = property.getValue();
    }

    public Integer getPropertyId() { return propertyId; }
    public void setPropertyId(Integer propertyId) { this.propertyId = propertyId; }

    public Integer getNeighborhoodId() { return neighborhoodId; }
    public void setNeighborhoodId(Integer neighborhoodId) { this.neighborhoodId = neighborhoodId; }

    public String getNeighborhoodName() { return neighborhoodName; }
    public void setNeighborhoodName(String neighborhoodName) { this.neighborhoodName = neighborhoodName; }

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