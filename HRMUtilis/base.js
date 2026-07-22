const { test } = require("@playwright/test");
const loginData = JSON.parse(JSON.stringify(require("../HRMUtilis/data.json")));
const { LoginPage } = require("../HRMpageobjects/Login");
const  {Exceloperations }  = require("./Exceloperations");
const {PIMPage} = require("../HRMpageobjects/PIM");

exports.customtest = test.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  loginData: async ({},use) =>
  {
    await use(loginData);
  },
  excelData: async ({},use) =>
  {
    const excelData = new Exceloperations();
    await use(excelData);
  },
  PIMpage: async({page},use) =>
  {
    const PIMpage = new PIMPage(page);
    await use(PIMpage);
  }
});
