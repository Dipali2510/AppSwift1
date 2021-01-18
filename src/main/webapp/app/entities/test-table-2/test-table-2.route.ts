import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITestTable2, TestTable2 } from 'app/shared/model/test-table-2.model';
import { TestTable2Service } from './test-table-2.service';
import { TestTable2Component } from './test-table-2.component';
import { TestTable2DetailComponent } from './test-table-2-detail.component';
import { TestTable2UpdateComponent } from './test-table-2-update.component';

@Injectable({ providedIn: 'root' })
export class TestTable2Resolve implements Resolve<ITestTable2> {
  constructor(private service: TestTable2Service, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITestTable2> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((testTable2: HttpResponse<TestTable2>) => {
          if (testTable2.body) {
            return of(testTable2.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TestTable2());
  }
}

export const testTable2Route: Routes = [
  {
    path: '',
    component: TestTable2Component,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TestTable2s',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TestTable2DetailComponent,
    resolve: {
      testTable2: TestTable2Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TestTable2s',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TestTable2UpdateComponent,
    resolve: {
      testTable2: TestTable2Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TestTable2s',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TestTable2UpdateComponent,
    resolve: {
      testTable2: TestTable2Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TestTable2s',
    },
    canActivate: [UserRouteAccessService],
  },
];
