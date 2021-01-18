import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITestTable1 } from 'app/shared/model/test-table-1.model';
import { TestTable1Service } from './test-table-1.service';
import { TestTable1DeleteDialogComponent } from './test-table-1-delete-dialog.component';

@Component({
  selector: 'cg-test-table-1',
  templateUrl: './test-table-1.component.html',
})
export class TestTable1Component implements OnInit, OnDestroy {
  testTable1s?: ITestTable1[];
  eventSubscriber?: Subscription;

  constructor(protected testTable1Service: TestTable1Service, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.testTable1Service.query().subscribe((res: HttpResponse<ITestTable1[]>) => (this.testTable1s = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTestTable1s();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITestTable1): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTestTable1s(): void {
    this.eventSubscriber = this.eventManager.subscribe('testTable1ListModification', () => this.loadAll());
  }

  delete(testTable1: ITestTable1): void {
    const modalRef = this.modalService.open(TestTable1DeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.testTable1 = testTable1;
  }
}
