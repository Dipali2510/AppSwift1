import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'test-table-1',
        loadChildren: () => import('./test-table-1/test-table-1.module').then(m => m.TestProject3TestTable1Module),
      },
      {
        path: 'test-table-2',
        loadChildren: () => import('./test-table-2/test-table-2.module').then(m => m.TestProject3TestTable2Module),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class TestProject3EntityModule {}
