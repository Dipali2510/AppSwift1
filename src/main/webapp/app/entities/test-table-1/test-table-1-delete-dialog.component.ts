import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITestTable1 } from 'app/shared/model/test-table-1.model';
import { TestTable1Service } from './test-table-1.service';

@Component({
  templateUrl: './test-table-1-delete-dialog.component.html',
})
export class TestTable1DeleteDialogComponent {
  testTable1?: ITestTable1;

  constructor(
    protected testTable1Service: TestTable1Service,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.testTable1Service.delete(id).subscribe(() => {
      this.eventManager.broadcast('testTable1ListModification');
      this.activeModal.close();
    });
  }
}
