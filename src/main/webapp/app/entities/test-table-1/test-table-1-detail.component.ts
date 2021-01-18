import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITestTable1 } from 'app/shared/model/test-table-1.model';

@Component({
  selector: 'cg-test-table-1-detail',
  templateUrl: './test-table-1-detail.component.html',
})
export class TestTable1DetailComponent implements OnInit {
  testTable1: ITestTable1 | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ testTable1 }) => (this.testTable1 = testTable1));
  }

  previousState(): void {
    window.history.back();
  }
}
