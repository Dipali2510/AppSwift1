import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TestProject3TestModule } from '../../../test.module';
import { TestTable2UpdateComponent } from 'app/entities/test-table-2/test-table-2-update.component';
import { TestTable2Service } from 'app/entities/test-table-2/test-table-2.service';
import { TestTable2 } from 'app/shared/model/test-table-2.model';

describe('Component Tests', () => {
  describe('TestTable2 Management Update Component', () => {
    let comp: TestTable2UpdateComponent;
    let fixture: ComponentFixture<TestTable2UpdateComponent>;
    let service: TestTable2Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestProject3TestModule],
        declarations: [TestTable2UpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TestTable2UpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TestTable2UpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TestTable2Service);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TestTable2(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TestTable2();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
