package com.cg.TestProject3.web.rest;

import com.cg.TestProject3.domain.TestTable2;
import com.cg.TestProject3.repository.TestTable2Repository;
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
 * REST controller for managing {@link com.cg.TestProject3.domain.TestTable2}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TestTable2Resource {

    private final Logger log = LoggerFactory.getLogger(TestTable2Resource.class);

    private static final String ENTITY_NAME = "testTable2";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TestTable2Repository testTable2Repository;

    public TestTable2Resource(TestTable2Repository testTable2Repository) {
        this.testTable2Repository = testTable2Repository;
    }

    /**
     * {@code POST  /test-table-2-s} : Create a new testTable2.
     *
     * @param testTable2 the testTable2 to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new testTable2, or with status {@code 400 (Bad Request)} if the testTable2 has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/test-table-2-s")
    public ResponseEntity<TestTable2> createTestTable2(@RequestBody TestTable2 testTable2) throws URISyntaxException {
        log.debug("REST request to save TestTable2 : {}", testTable2);
        if (testTable2.getId() != null) {
            throw new BadRequestAlertException("A new testTable2 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestTable2 result = testTable2Repository.save(testTable2);
        return ResponseEntity.created(new URI("/api/test-table-2-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /test-table-2-s} : Updates an existing testTable2.
     *
     * @param testTable2 the testTable2 to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated testTable2,
     * or with status {@code 400 (Bad Request)} if the testTable2 is not valid,
     * or with status {@code 500 (Internal Server Error)} if the testTable2 couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/test-table-2-s")
    public ResponseEntity<TestTable2> updateTestTable2(@RequestBody TestTable2 testTable2) throws URISyntaxException {
        log.debug("REST request to update TestTable2 : {}", testTable2);
        if (testTable2.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TestTable2 result = testTable2Repository.save(testTable2);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, testTable2.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /test-table-2-s} : get all the testTable2s.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of testTable2s in body.
     */
    @GetMapping("/test-table-2-s")
    public List<TestTable2> getAllTestTable2s() {
        if ("testtable1_column1-is-null".equals(filter)) {
            log.debug("REST request to get all TestTable2s where TestTable1_Column1 is null");
            return StreamSupport
                .stream(testTable2Repository.findAll().spliterator(), false)
                .filter(testTable2 -> testTable2.getTestTable1_Column1() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all TestTable2s");
        return testTable2Repository.findAll();
    }

    /**
     * {@code GET  /test-table-2-s/:id} : get the "id" testTable2.
     *
     * @param id the id of the testTable2 to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the testTable2, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/test-table-2-s/{id}")
    public ResponseEntity<TestTable2> getTestTable2(@PathVariable Long id) {
        log.debug("REST request to get TestTable2 : {}", id);
        Optional<TestTable2> testTable2 = testTable2Repository.findById(id);
        return ResponseUtil.wrapOrNotFound(testTable2);
    }

    /**
     * {@code DELETE  /test-table-2-s/:id} : delete the "id" testTable2.
     *
     * @param id the id of the testTable2 to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/test-table-2-s/{id}")
    public ResponseEntity<Void> deleteTestTable2(@PathVariable Long id) {
        log.debug("REST request to delete TestTable2 : {}", id);
        testTable2Repository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
