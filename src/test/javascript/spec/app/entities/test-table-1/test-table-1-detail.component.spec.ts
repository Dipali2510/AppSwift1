import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestProject3TestModule } from '../../../test.module';
import { TestTable1DetailComponent } from 'app/entities/test-table-1/test-table-1-detail.component';
import { TestTable1 } from 'app/shared/model/test-table-1.model';

describe('Component Tests', () => {
  describe('TestTable1 Management Detail Component', () => {
    let comp: TestTable1DetailComponent;
    let fixture: ComponentFixture<TestTable1DetailComponent>;
    const route = ({ data: of({ testTable1: new TestTable1(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestProject3TestModule],
        declarations: [TestTable1DetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TestTable1DetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TestTable1DetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load testTable1 on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.testTable1).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
