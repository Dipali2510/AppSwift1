package com.cg.TestProject3.web.rest;

import com.cg.TestProject3.domain.TestTable1;
import com.cg.TestProject3.repository.TestTable1Repository;
import com.cg.TestProject3.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.cg.TestProject3.domain.TestTable1}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TestTable1Resource {

    private final Logger log = LoggerFactory.getLogger(TestTable1Resource.class);

    private static final String ENTITY_NAME = "testTable1";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TestTable1Repository testTable1Repository;

    public TestTable1Resource(TestTable1Repository testTable1Repository) {
        this.testTable1Repository = testTable1Repository;
    }

    /**
     * {@code POST  /test-table-1-s} : Create a new testTable1.
     *
     * @param testTable1 the testTable1 to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new testTable1, or with status {@code 400 (Bad Request)} if the testTable1 has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/test-table-1-s")
    public ResponseEntity<TestTable1> createTestTable1(@RequestBody TestTable1 testTable1) throws URISyntaxException {
        log.debug("REST request to save TestTable1 : {}", testTable1);
        if (testTable1.getId() != null) {
            throw new BadRequestAlertException("A new testTable1 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestTable1 result = testTable1Repository.save(testTable1);
        return ResponseEntity.created(new URI("/api/test-table-1-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /test-table-1-s} : Updates an existing testTable1.
     *
     * @param testTable1 the testTable1 to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated testTable1,
     * or with status {@code 400 (Bad Request)} if the testTable1 is not valid,
     * or with status {@code 500 (Internal Server Error)} if the testTable1 couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/test-table-1-s")
    public ResponseEntity<TestTable1> updateTestTable1(@RequestBody TestTable1 testTable1) throws URISyntaxException {
        log.debug("REST request to update TestTable1 : {}", testTable1);
        if (testTable1.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TestTable1 result = testTable1Repository.save(testTable1);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, testTable1.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /test-table-1-s} : get all the testTable1s.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of testTable1s in body.
     */
    @GetMapping("/test-table-1-s")
    public List<TestTable1> getAllTestTable1s() {
        if ("testtable1_column1-is-null".equals(filter)) {
            log.debug("REST request to get all TestTable1s where TestTable1_Column1 is null");
            return StreamSupport
                .stream(testTable1Repository.findAll().spliterator(), false)
                .filter(testTable1 -> testTable1.getTestTable1_Column1() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all TestTable1s");
        return testTable1Repository.findAll();
    }

    /**
     * {@code GET  /test-table-1-s/:id} : get the "id" testTable1.
     *
     * @param id the id of the testTable1 to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the testTable1, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/test-table-1-s/{id}")
    public ResponseEntity<TestTable1> getTestTable1(@PathVariable Long id) {
        log.debug("REST request to get TestTable1 : {}", id);
        Optional<TestTable1> testTable1 = testTable1Repository.findById(id);
        return ResponseUtil.wrapOrNotFound(testTable1);
    }

    /**
     * {@code DELETE  /test-table-1-s/:id} : delete the "id" testTable1.
     *
     * @param id the id of the testTable1 to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/test-table-1-s/{id}")
    public ResponseEntity<Void> deleteTestTable1(@PathVariable Long id) {
        log.debug("REST request to delete TestTable1 : {}", id);
        testTable1Repository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
