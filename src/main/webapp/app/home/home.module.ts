import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestProject3SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [TestProject3SharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent],
})
export class TestProject3HomeModule {}
