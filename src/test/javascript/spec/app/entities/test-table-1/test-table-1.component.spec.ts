import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestProject3TestModule } from '../../../test.module';
import { TestTable1Component } from 'app/entities/test-table-1/test-table-1.component';
import { TestTable1Service } from 'app/entities/test-table-1/test-table-1.service';
import { TestTable1 } from 'app/shared/model/test-table-1.model';

describe('Component Tests', () => {
  describe('TestTable1 Management Component', () => {
    let comp: TestTable1Component;
    let fixture: ComponentFixture<TestTable1Component>;
    let service: TestTable1Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestProject3TestModule],
        declarations: [TestTable1Component],
      })
        .overrideTemplate(TestTable1Component, '')
        .compileComponents();

      fixture = TestBed.createComponent(TestTable1Component);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TestTable1Service);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TestTable1(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.testTable1s && comp.testTable1s[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
