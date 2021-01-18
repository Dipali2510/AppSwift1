import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TestTable2ComponentsPage, TestTable2DeleteDialog, TestTable2UpdatePage } from './test-table-2.page-object';

const expect = chai.expect;

describe('TestTable2 e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let testTable2ComponentsPage: TestTable2ComponentsPage;
  let testTable2UpdatePage: TestTable2UpdatePage;
  let testTable2DeleteDialog: TestTable2DeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TestTable2s', async () => {
    await navBarPage.goToEntity('test-table-2');
    testTable2ComponentsPage = new TestTable2ComponentsPage();
    await browser.wait(ec.visibilityOf(testTable2ComponentsPage.title), 5000);
    expect(await testTable2ComponentsPage.getTitle()).to.eq('Test Table 2 S');
    await browser.wait(ec.or(ec.visibilityOf(testTable2ComponentsPage.entities), ec.visibilityOf(testTable2ComponentsPage.noResult)), 1000);
  });

  it('should load create TestTable2 page', async () => {
    await testTable2ComponentsPage.clickOnCreateButton();
    testTable2UpdatePage = new TestTable2UpdatePage();
    expect(await testTable2UpdatePage.getPageTitle()).to.eq('Create or edit a Test Table 2');
    await testTable2UpdatePage.cancel();
  });

  it('should create and save TestTable2s', async () => {
    const nbButtonsBeforeCreate = await testTable2ComponentsPage.countDeleteButtons();

    await testTable2ComponentsPage.clickOnCreateButton();

    await promise.all([testTable2UpdatePage.setColumn2Input('Column2')]);

    expect(await testTable2UpdatePage.getColumn2Input()).to.eq('Column2', 'Expected Column2 value to be equals to Column2');

    await testTable2UpdatePage.save();
    expect(await testTable2UpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await testTable2ComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TestTable2', async () => {
    const nbButtonsBeforeDelete = await testTable2ComponentsPage.countDeleteButtons();
    await testTable2ComponentsPage.clickOnLastDeleteButton();

    testTable2DeleteDialog = new TestTable2DeleteDialog();
    expect(await testTable2DeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Test Table 2?');
    await testTable2DeleteDialog.clickOnConfirmButton();

    expect(await testTable2ComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
