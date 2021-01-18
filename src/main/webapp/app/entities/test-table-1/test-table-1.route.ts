import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITestTable1, TestTable1 } from 'app/shared/model/test-table-1.model';
import { TestTable1Service } from './test-table-1.service';
import { TestTable1Component } from './test-table-1.component';
import { TestTable1DetailComponent } from './test-table-1-detail.component';
import { TestTable1UpdateComponent } from './test-table-1-update.component';

@Injectable({ providedIn: 'root' })
export class TestTable1Resolve implements Resolve<ITestTable1> {
  constructor(private service: TestTable1Service, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITestTable1> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((testTable1: HttpResponse<TestTable1>) => {
          if (testTable1.body) {
            return of(testTable1.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TestTable1());
  }
}

export const testTable1Route: Routes = [
  {
    path: '',
    component: TestTable1Component,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TestTable1s',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TestTable1DetailComponent,
    resolve: {
      testTable1: TestTable1Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TestTable1s',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TestTable1UpdateComponent,
    resolve: {
      testTable1: TestTable1Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TestTable1s',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TestTable1UpdateComponent,
    resolve: {
      testTable1: TestTable1Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TestTable1s',
    },
    canActivate: [UserRouteAccessService],
  },
];
