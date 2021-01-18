package com.cg.TestProject3.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.cg.TestProject3.web.rest.TestUtil;

public class TestTable2Test {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestTable2.class);
        TestTable2 testTable21 = new TestTable2();
        testTable21.setId(1L);
        TestTable2 testTable22 = new TestTable2();
        testTable22.setId(testTable21.getId());
        assertThat(testTable21).isEqualTo(testTable22);
        testTable22.setId(2L);
        assertThat(testTable21).isNotEqualTo(testTable22);
        testTable21.setId(null);
        assertThat(testTable21).isNotEqualTo(testTable22);
    }
}
