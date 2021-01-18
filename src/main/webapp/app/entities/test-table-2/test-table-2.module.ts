import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestProject3SharedModule } from 'app/shared/shared.module';
import { TestTable2Component } from './test-table-2.component';
import { TestTable2DetailComponent } from './test-table-2-detail.component';
import { TestTable2UpdateComponent } from './test-table-2-update.component';
import { TestTable2DeleteDialogComponent } from './test-table-2-delete-dialog.component';
import { testTable2Route } from './test-table-2.route';

@NgModule({
  imports: [TestProject3SharedModule, RouterModule.forChild(testTable2Route)],
  declarations: [TestTable2Component, TestTable2DetailComponent, TestTable2UpdateComponent, TestTable2DeleteDialogComponent],
  entryComponents: [TestTable2DeleteDialogComponent],
})
export class TestProject3TestTable2Module {}
