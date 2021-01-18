import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TestProject3TestModule } from '../../../test.module';
import { TestTable1UpdateComponent } from 'app/entities/test-table-1/test-table-1-update.component';
import { TestTable1Service } from 'app/entities/test-table-1/test-table-1.service';
import { TestTable1 } from 'app/shared/model/test-table-1.model';

describe('Component Tests', () => {
  describe('TestTable1 Management Update Component', () => {
    let comp: TestTable1UpdateComponent;
    let fixture: ComponentFixture<TestTable1UpdateComponent>;
    let service: TestTable1Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestProject3TestModule],
        declarations: [TestTable1UpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TestTable1UpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TestTable1UpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TestTable1Service);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TestTable1(123);
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
        const entity = new TestTable1();
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
