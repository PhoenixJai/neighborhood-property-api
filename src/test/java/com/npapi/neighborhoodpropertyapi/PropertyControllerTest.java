package com.npapi.neighborhoodpropertyapi;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class PropertyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getPropertiesByNeighborhood_returnsTenPropertiesWithFlattenedShape() throws Exception {
        mockMvc.perform(get("/neighborhoods/1/properties"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(10))
                .andExpect(jsonPath("$[0].neighborhoodId").value(1))
                .andExpect(jsonPath("$[0].neighborhoodName").value("Trolley Square"))
                .andExpect(jsonPath("$[0].neighborhood").doesNotExist());
    }

    @Test
    void getPropertiesByNeighborhood_returnsEmptyListForNonexistentNeighborhood() throws Exception {
        mockMvc.perform(get("/neighborhoods/9999/properties"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));
    }
}