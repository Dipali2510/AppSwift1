import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TestTable1ComponentsPage, TestTable1DeleteDialog, TestTable1UpdatePage } from './test-table-1.page-object';

const expect = chai.expect;

describe('TestTable1 e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let testTable1ComponentsPage: TestTable1ComponentsPage;
  let testTable1UpdatePage: TestTable1UpdatePage;
  let testTable1DeleteDialog: TestTable1DeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TestTable1s', async () => {
    await navBarPage.goToEntity('test-table-1');
    testTable1ComponentsPage = new TestTable1ComponentsPage();
    await browser.wait(ec.visibilityOf(testTable1ComponentsPage.title), 5000);
    expect(await testTable1ComponentsPage.getTitle()).to.eq('Test Table 1 S');
    await browser.wait(ec.or(ec.visibilityOf(testTable1ComponentsPage.entities), ec.visibilityOf(testTable1ComponentsPage.noResult)), 1000);
  });

  it('should load create TestTable1 page', async () => {
    await testTable1ComponentsPage.clickOnCreateButton();
    testTable1UpdatePage = new TestTable1UpdatePage();
    expect(await testTable1UpdatePage.getPageTitle()).to.eq('Create or edit a Test Table 1');
    await testTable1UpdatePage.cancel();
  });

  it('should create and save TestTable1s', async () => {
    const nbButtonsBeforeCreate = await testTable1ComponentsPage.countDeleteButtons();

    await testTable1ComponentsPage.clickOnCreateButton();

    await promise.all([testTable1UpdatePage.setColumn1Input('Column1')]);

    expect(await testTable1UpdatePage.getColumn1Input()).to.eq('Column1', 'Expected Column1 value to be equals to Column1');

    await testTable1UpdatePage.save();
    expect(await testTable1UpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await testTable1ComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TestTable1', async () => {
    const nbButtonsBeforeDelete = await testTable1ComponentsPage.countDeleteButtons();
    await testTable1ComponentsPage.clickOnLastDeleteButton();

    testTable1DeleteDialog = new TestTable1DeleteDialog();
    expect(await testTable1DeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Test Table 1?');
    await testTable1DeleteDialog.clickOnConfirmButton();

    expect(await testTable1ComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
