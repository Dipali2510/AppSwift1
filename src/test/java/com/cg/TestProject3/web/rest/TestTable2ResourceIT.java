package com.cg.TestProject3.web.rest;

import com.cg.TestProject3.TestProject3App;
import com.cg.TestProject3.domain.TestTable2;
import com.cg.TestProject3.repository.TestTable2Repository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TestTable2Resource} REST controller.
 */
@SpringBootTest(classes = TestProject3App.class)
@AutoConfigureMockMvc
@WithMockUser
public class TestTable2ResourceIT {

    private static final String DEFAULT_COLUMN_2 = "AAAAAAAAAA";
    private static final String UPDATED_COLUMN_2 = "BBBBBBBBBB";

    @Autowired
    private TestTable2Repository testTable2Repository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTestTable2MockMvc;

    private TestTable2 testTable2;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TestTable2 createEntity(EntityManager em) {
        TestTable2 testTable2 = new TestTable2();
        testTable2.setColumn2(DEFAULT_COLUMN_2);
        return testTable2;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TestTable2 createUpdatedEntity(EntityManager em) {
        TestTable2 testTable2 = new TestTable2();
        testTable2.setColumn2(UPDATED_COLUMN_2);
        return testTable2;
    }

    @BeforeEach
    public void initTest() {
        testTable2 = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestTable2() throws Exception {
        int databaseSizeBeforeCreate = testTable2Repository.findAll().size();
        // Create the TestTable2
        restTestTable2MockMvc.perform(post("/api/test-table-2-s").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(testTable2)))
            .andExpect(status().isCreated());

        // Validate the TestTable2 in the database
        List<TestTable2> testTable2List = testTable2Repository.findAll();
        assertThat(testTable2List).hasSize(databaseSizeBeforeCreate + 1);
        TestTable2 testTestTable2 = testTable2List.get(testTable2List.size() - 1);
        assertThat(testTestTable2.getColumn2()).isEqualTo(DEFAULT_COLUMN_2);
    }

    @Test
    @Transactional
    public void createTestTable2WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testTable2Repository.findAll().size();

        // Create the TestTable2 with an existing ID
        testTable2.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestTable2MockMvc.perform(post("/api/test-table-2-s").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(testTable2)))
            .andExpect(status().isBadRequest());

        // Validate the TestTable2 in the database
        List<TestTable2> testTable2List = testTable2Repository.findAll();
        assertThat(testTable2List).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTestTable2s() throws Exception {
        // Initialize the database
        testTable2Repository.saveAndFlush(testTable2);

        // Get all the testTable2List
        restTestTable2MockMvc.perform(get("/api/test-table-2-s?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testTable2.getId().intValue())))
            .andExpect(jsonPath("$.[*].Column2").value(hasItem(DEFAULT_COLUMN_2)));
    }
    
    @Test
    @Transactional
    public void getTestTable2() throws Exception {
        // Initialize the database
        testTable2Repository.saveAndFlush(testTable2);

        // Get the testTable2
        restTestTable2MockMvc.perform(get("/api/test-table-2-s/{id}", testTable2.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(testTable2.getId().intValue()))
            .andExpect(jsonPath("$.Column2").value(DEFAULT_COLUMN_2));
    }
    @Test
    @Transactional
    public void getNonExistingTestTable2() throws Exception {
        // Get the testTable2
        restTestTable2MockMvc.perform(get("/api/test-table-2-s/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestTable2() throws Exception {
        // Initialize the database
        testTable2Repository.saveAndFlush(testTable2);

        int databaseSizeBeforeUpdate = testTable2Repository.findAll().size();

        // Update the testTable2
        TestTable2 updatedTestTable2 = testTable2Repository.findById(testTable2.getId()).get();
        // Disconnect from session so that the updates on updatedTestTable2 are not directly saved in db
        em.detach(updatedTestTable2);
        updatedTestTable2.setColumn2(UPDATED_COLUMN_2);

        restTestTable2MockMvc.perform(put("/api/test-table-2-s").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestTable2)))
            .andExpect(status().isOk());

        // Validate the TestTable2 in the database
        List<TestTable2> testTable2List = testTable2Repository.findAll();
        assertThat(testTable2List).hasSize(databaseSizeBeforeUpdate);
        TestTable2 testTestTable2 = testTable2List.get(testTable2List.size() - 1);
        assertThat(testTestTable2.getColumn2()).isEqualTo(UPDATED_COLUMN_2);
    }

    @Test
    @Transactional
    public void updateNonExistingTestTable2() throws Exception {
        int databaseSizeBeforeUpdate = testTable2Repository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTestTable2MockMvc.perform(put("/api/test-table-2-s").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(testTable2)))
            .andExpect(status().isBadRequest());

        // Validate the TestTable2 in the database
        List<TestTable2> testTable2List = testTable2Repository.findAll();
        assertThat(testTable2List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTestTable2() throws Exception {
        // Initialize the database
        testTable2Repository.saveAndFlush(testTable2);

        int databaseSizeBeforeDelete = testTable2Repository.findAll().size();

        // Delete the testTable2
        restTestTable2MockMvc.perform(delete("/api/test-table-2-s/{id}", testTable2.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TestTable2> testTable2List = testTable2Repository.findAll();
        assertThat(testTable2List).hasSize(databaseSizeBeforeDelete - 1);
    }
}
