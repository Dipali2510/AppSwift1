import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITestTable2 } from 'app/shared/model/test-table-2.model';
import { TestTable2Service } from './test-table-2.service';

@Component({
  templateUrl: './test-table-2-delete-dialog.component.html',
})
export class TestTable2DeleteDialogComponent {
  testTable2?: ITestTable2;

  constructor(
    protected testTable2Service: TestTable2Service,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.testTable2Service.delete(id).subscribe(() => {
      this.eventManager.broadcast('testTable2ListModification');
      this.activeModal.close();
    });
  }
}
