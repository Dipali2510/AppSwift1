package com.cg.TestProject3.domain;


import javax.persistence.*;

import java.io.Serializable;

/**
 * A TestTable1.
 */
@Entity
@Table(name = "test_table1")
public class TestTable1 implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "column_1")
    private String Column1;

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

    public String getColumn1() {
        return Column1;
    }

    public void setColumn1(String Column1) {
        this.Column1 = Column1;
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
        if (!(o instanceof TestTable1)) {
            return false;
        }
        return id != null && id.equals(((TestTable1) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TestTable1{" +
            "id=" + getId() +
            ", Column1='" + getColumn1() + "'" +
            "}";
    }
}
