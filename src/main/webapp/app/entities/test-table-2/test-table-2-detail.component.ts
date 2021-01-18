import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITestTable2 } from 'app/shared/model/test-table-2.model';

@Component({
  selector: 'cg-test-table-2-detail',
  templateUrl: './test-table-2-detail.component.html',
})
export class TestTable2DetailComponent implements OnInit {
  testTable2: ITestTable2 | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ testTable2 }) => (this.testTable2 = testTable2));
  }

  previousState(): void {
    window.history.back();
  }
}
