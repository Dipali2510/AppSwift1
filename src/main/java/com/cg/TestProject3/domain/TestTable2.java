package com.cg.TestProject3.domain;


import javax.persistence.*;

import java.io.Serializable;

/**
 * A TestTable2.
 */
@Entity
@Table(name = "test_table2")
public class TestTable2 implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "column_2")
    private String Column2;

    @OneToOne
    @JoinColumn(unique = true)
    private TestTable2 testTable1_Column1;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getColumn2() {
        return Column2;
    }

    public void setColumn2(String Column2) {
        this.Column2 = Column2;
    }

    public TestTable2 getTestTable1_Column1() {
        return testTable1_Column1;
    }

    public void setTestTable1_Column1(TestTable2 TestTable2) {
        this.testTable1_Column1 = TestTable2;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TestTable2)) {
            return false;
        }
        return id != null && id.equals(((TestTable2) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TestTable2{" +
            "id=" + getId() +
            ", Column2='" + getColumn2() + "'" +
            "}";
    }
}
