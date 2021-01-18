import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestProject3TestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { TestTable1DeleteDialogComponent } from 'app/entities/test-table-1/test-table-1-delete-dialog.component';
import { TestTable1Service } from 'app/entities/test-table-1/test-table-1.service';

describe('Component Tests', () => {
  describe('TestTable1 Management Delete Component', () => {
    let comp: TestTable1DeleteDialogComponent;
    let fixture: ComponentFixture<TestTable1DeleteDialogComponent>;
    let service: TestTable1Service;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestProject3TestModule],
        declarations: [TestTable1DeleteDialogComponent],
      })
        .overrideTemplate(TestTable1DeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TestTable1DeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TestTable1Service);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
