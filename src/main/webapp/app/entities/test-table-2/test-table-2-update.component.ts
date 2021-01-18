import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITestTable2, TestTable2 } from 'app/shared/model/test-table-2.model';
import { TestTable2Service } from './test-table-2.service';

@Component({
  selector: 'cg-test-table-2-update',
  templateUrl: './test-table-2-update.component.html',
})
export class TestTable2UpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    Column2: [],
  });

  constructor(protected testTable2Service: TestTable2Service, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ testTable2 }) => {
      this.updateForm(testTable2);
    });
  }

  updateForm(testTable2: ITestTable2): void {
    this.editForm.patchValue({
      id: testTable2.id,
      Column2: testTable2.Column2,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const testTable2 = this.createFromForm();
    if (testTable2.id !== undefined) {
      this.subscribeToSaveResponse(this.testTable2Service.update(testTable2));
    } else {
      this.subscribeToSaveResponse(this.testTable2Service.create(testTable2));
    }
  }

  private createFromForm(): ITestTable2 {
    return {
      ...new TestTable2(),
      id: this.editForm.get(['id'])!.value,
      Column2: this.editForm.get(['Column2'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITestTable2>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
