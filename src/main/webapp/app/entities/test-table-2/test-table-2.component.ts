import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITestTable2 } from 'app/shared/model/test-table-2.model';
import { TestTable2Service } from './test-table-2.service';
import { TestTable2DeleteDialogComponent } from './test-table-2-delete-dialog.component';

@Component({
  selector: 'cg-test-table-2',
  templateUrl: './test-table-2.component.html',
})
export class TestTable2Component implements OnInit, OnDestroy {
  testTable2s?: ITestTable2[];
  eventSubscriber?: Subscription;

  constructor(protected testTable2Service: TestTable2Service, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.testTable2Service.query().subscribe((res: HttpResponse<ITestTable2[]>) => (this.testTable2s = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTestTable2s();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITestTable2): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTestTable2s(): void {
    this.eventSubscriber = this.eventManager.subscribe('testTable2ListModification', () => this.loadAll());
  }

  delete(testTable2: ITestTable2): void {
    const modalRef = this.modalService.open(TestTable2DeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.testTable2 = testTable2;
  }
}
