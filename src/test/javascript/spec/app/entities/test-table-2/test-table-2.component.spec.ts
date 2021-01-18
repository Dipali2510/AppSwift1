import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestProject3TestModule } from '../../../test.module';
import { TestTable2Component } from 'app/entities/test-table-2/test-table-2.component';
import { TestTable2Service } from 'app/entities/test-table-2/test-table-2.service';
import { TestTable2 } from 'app/shared/model/test-table-2.model';

describe('Component Tests', () => {
  describe('TestTable2 Management Component', () => {
    let comp: TestTable2Component;
    let fixture: ComponentFixture<TestTable2Component>;
    let service: TestTable2Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestProject3TestModule],
        declarations: [TestTable2Component],
      })
        .overrideTemplate(TestTable2Component, '')
        .compileComponents();

      fixture = TestBed.createComponent(TestTable2Component);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TestTable2Service);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TestTable2(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.testTable2s && comp.testTable2s[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
