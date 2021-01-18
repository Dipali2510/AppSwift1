package com.cg.TestProject3.repository;

import com.cg.TestProject3.domain.TestTable1;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TestTable1 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestTable1Repository extends JpaRepository<TestTable1, Long> {
}
