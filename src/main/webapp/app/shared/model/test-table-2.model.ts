export interface ITestTable2 {
  id?: number;
  Column2?: string;
  testTable1_Column1?: ITestTable2;
}

export class TestTable2 implements ITestTable2 {
  constructor(public id?: number, public Column2?: string, public testTable1_Column1?: ITestTable2) {}
}
