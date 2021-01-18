package com.cg.TestProject3.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.cg.TestProject3.web.rest.TestUtil;

public class TestTable1Test {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestTable1.class);
        TestTable1 testTable11 = new TestTable1();
        testTable11.setId(1L);
        TestTable1 testTable12 = new TestTable1();
        testTable12.setId(testTable11.getId());
        assertThat(testTable11).isEqualTo(testTable12);
        testTable12.setId(2L);
        assertThat(testTable11).isNotEqualTo(testTable12);
        testTable11.setId(null);
        assertThat(testTable11).isNotEqualTo(testTable12);
    }
}
