import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestProject3TestModule } from '../../../test.module';
import { TestTable2DetailComponent } from 'app/entities/test-table-2/test-table-2-detail.component';
import { TestTable2 } from 'app/shared/model/test-table-2.model';

describe('Component Tests', () => {
  describe('TestTable2 Management Detail Component', () => {
    let comp: TestTable2DetailComponent;
    let fixture: ComponentFixture<TestTable2DetailComponent>;
    const route = ({ data: of({ testTable2: new TestTable2(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestProject3TestModule],
        declarations: [TestTable2DetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TestTable2DetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TestTable2DetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load testTable2 on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.testTable2).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
