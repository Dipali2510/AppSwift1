package com.cg.TestProject3.web.rest;

import com.cg.TestProject3.TestProject3App;
import com.cg.TestProject3.domain.TestTable1;
import com.cg.TestProject3.repository.TestTable1Repository;

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
 * Integration tests for the {@link TestTable1Resource} REST controller.
 */
@SpringBootTest(classes = TestProject3App.class)
@AutoConfigureMockMvc
@WithMockUser
public class TestTable1ResourceIT {

    private static final String DEFAULT_COLUMN_1 = "AAAAAAAAAA";
    private static final String UPDATED_COLUMN_1 = "BBBBBBBBBB";

    @Autowired
    private TestTable1Repository testTable1Repository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTestTable1MockMvc;

    private TestTable1 testTable1;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TestTable1 createEntity(EntityManager em) {
        TestTable1 testTable1 = new TestTable1();
        testTable1.setColumn1(DEFAULT_COLUMN_1);
        return testTable1;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TestTable1 createUpdatedEntity(EntityManager em) {
        TestTable1 testTable1 = new TestTable1();
        testTable1.setColumn1(UPDATED_COLUMN_1);
        return testTable1;
    }

    @BeforeEach
    public void initTest() {
        testTable1 = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestTable1() throws Exception {
        int databaseSizeBeforeCreate = testTable1Repository.findAll().size();
        // Create the TestTable1
        restTestTable1MockMvc.perform(post("/api/test-table-1-s").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(testTable1)))
            .andExpect(status().isCreated());

        // Validate the TestTable1 in the database
        List<TestTable1> testTable1List = testTable1Repository.findAll();
        assertThat(testTable1List).hasSize(databaseSizeBeforeCreate + 1);
        TestTable1 testTestTable1 = testTable1List.get(testTable1List.size() - 1);
        assertThat(testTestTable1.getColumn1()).isEqualTo(DEFAULT_COLUMN_1);
    }

    @Test
    @Transactional
    public void createTestTable1WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testTable1Repository.findAll().size();

        // Create the TestTable1 with an existing ID
        testTable1.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestTable1MockMvc.perform(post("/api/test-table-1-s").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(testTable1)))
            .andExpect(status().isBadRequest());

        // Validate the TestTable1 in the database
        List<TestTable1> testTable1List = testTable1Repository.findAll();
        assertThat(testTable1List).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTestTable1s() throws Exception {
        // Initialize the database
        testTable1Repository.saveAndFlush(testTable1);

        // Get all the testTable1List
        restTestTable1MockMvc.perform(get("/api/test-table-1-s?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testTable1.getId().intValue())))
            .andExpect(jsonPath("$.[*].Column1").value(hasItem(DEFAULT_COLUMN_1)));
    }
    
    @Test
    @Transactional
    public void getTestTable1() throws Exception {
        // Initialize the database
        testTable1Repository.saveAndFlush(testTable1);

        // Get the testTable1
        restTestTable1MockMvc.perform(get("/api/test-table-1-s/{id}", testTable1.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(testTable1.getId().intValue()))
            .andExpect(jsonPath("$.Column1").value(DEFAULT_COLUMN_1));
    }
    @Test
    @Transactional
    public void getNonExistingTestTable1() throws Exception {
        // Get the testTable1
        restTestTable1MockMvc.perform(get("/api/test-table-1-s/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestTable1() throws Exception {
        // Initialize the database
        testTable1Repository.saveAndFlush(testTable1);

        int databaseSizeBeforeUpdate = testTable1Repository.findAll().size();

        // Update the testTable1
        TestTable1 updatedTestTable1 = testTable1Repository.findById(testTable1.getId()).get();
        // Disconnect from session so that the updates on updatedTestTable1 are not directly saved in db
        em.detach(updatedTestTable1);
        updatedTestTable1.setColumn1(UPDATED_COLUMN_1);

        restTestTable1MockMvc.perform(put("/api/test-table-1-s").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestTable1)))
            .andExpect(status().isOk());

        // Validate the TestTable1 in the database
        List<TestTable1> testTable1List = testTable1Repository.findAll();
        assertThat(testTable1List).hasSize(databaseSizeBeforeUpdate);
        TestTable1 testTestTable1 = testTable1List.get(testTable1List.size() - 1);
        assertThat(testTestTable1.getColumn1()).isEqualTo(UPDATED_COLUMN_1);
    }

    @Test
    @Transactional
    public void updateNonExistingTestTable1() throws Exception {
        int databaseSizeBeforeUpdate = testTable1Repository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTestTable1MockMvc.perform(put("/api/test-table-1-s").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(testTable1)))
            .andExpect(status().isBadRequest());

        // Validate the TestTable1 in the database
        List<TestTable1> testTable1List = testTable1Repository.findAll();
        assertThat(testTable1List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTestTable1() throws Exception {
        // Initialize the database
        testTable1Repository.saveAndFlush(testTable1);

        int databaseSizeBeforeDelete = testTable1Repository.findAll().size();

        // Delete the testTable1
        restTestTable1MockMvc.perform(delete("/api/test-table-1-s/{id}", testTable1.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TestTable1> testTable1List = testTable1Repository.findAll();
        assertThat(testTable1List).hasSize(databaseSizeBeforeDelete - 1);
    }
}
