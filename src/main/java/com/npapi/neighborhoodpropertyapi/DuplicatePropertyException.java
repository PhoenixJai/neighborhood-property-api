package com.npapi.neighborhoodpropertyapi;

public class DuplicatePropertyException extends RuntimeException {

    public DuplicatePropertyException(String message) {
        super(message);
    }
}