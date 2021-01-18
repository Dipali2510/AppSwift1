import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITestTable1, TestTable1 } from 'app/shared/model/test-table-1.model';
import { TestTable1Service } from './test-table-1.service';

@Component({
  selector: 'cg-test-table-1-update',
  templateUrl: './test-table-1-update.component.html',
})
export class TestTable1UpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    Column1: [],
  });

  constructor(protected testTable1Service: TestTable1Service, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ testTable1 }) => {
      this.updateForm(testTable1);
    });
  }

  updateForm(testTable1: ITestTable1): void {
    this.editForm.patchValue({
      id: testTable1.id,
      Column1: testTable1.Column1,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const testTable1 = this.createFromForm();
    if (testTable1.id !== undefined) {
      this.subscribeToSaveResponse(this.testTable1Service.update(testTable1));
    } else {
      this.subscribeToSaveResponse(this.testTable1Service.create(testTable1));
    }
  }

  private createFromForm(): ITestTable1 {
    return {
      ...new TestTable1(),
      id: this.editForm.get(['id'])!.value,
      Column1: this.editForm.get(['Column1'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITestTable1>>): void {
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
