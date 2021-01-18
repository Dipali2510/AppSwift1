import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestProject3SharedModule } from 'app/shared/shared.module';
import { TestTable1Component } from './test-table-1.component';
import { TestTable1DetailComponent } from './test-table-1-detail.component';
import { TestTable1UpdateComponent } from './test-table-1-update.component';
import { TestTable1DeleteDialogComponent } from './test-table-1-delete-dialog.component';
import { testTable1Route } from './test-table-1.route';

@NgModule({
  imports: [TestProject3SharedModule, RouterModule.forChild(testTable1Route)],
  declarations: [TestTable1Component, TestTable1DetailComponent, TestTable1UpdateComponent, TestTable1DeleteDialogComponent],
  entryComponents: [TestTable1DeleteDialogComponent],
})
export class TestProject3TestTable1Module {}
