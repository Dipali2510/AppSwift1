import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { TestProject3SharedModule } from 'app/shared/shared.module';
import { TestProject3CoreModule } from 'app/core/core.module';
import { TestProject3AppRoutingModule } from './app-routing.module';
import { TestProject3HomeModule } from './home/home.module';
import { TestProject3EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    TestProject3SharedModule,
    TestProject3CoreModule,
    TestProject3HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    TestProject3EntityModule,
    TestProject3AppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class TestProject3AppModule {}
