package com.cg.TestProject3.repository;

import com.cg.TestProject3.domain.TestTable2;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TestTable2 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestTable2Repository extends JpaRepository<TestTable2, Long> {
}
