import { ITestTable2 } from 'app/shared/model/test-table-2.model';

export interface ITestTable1 {
  id?: number;
  Column1?: string;
  testTable1_Column1?: ITestTable2;
}

export class TestTable1 implements ITestTable1 {
  constructor(public id?: number, public Column1?: string, public testTable1_Column1?: ITestTable2) {}
}
