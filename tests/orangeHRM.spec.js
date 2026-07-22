const { test, expect } = require("@playwright/test");
const { customtest } = require("../HRMUtilis/base");

const { log } = require("node:console");

customtest(
  " @Web Orange HRM Full Flow Page Object",
  async ({page, loginPage, loginData, excelData,PIMpage }) => {

    //Login Flow
    await loginPage.goTo();
    await loginPage.ValidLogin(loginData.username, loginData.password);

    //Read Employees From Excel
    const EmployeeData = await excelData.ReadExcelData(
      "D:/Automation Roadmap/PlayWright/HRMUtilis/employeedata.xlsx",
      "Sheet1",
    );

    //Navigate To PIM Page and Add Employee
    await PIMpage.NavigateToAddEmployee();
    await PIMpage.AddEmployee(EmployeeData);

    //Search The Added Employees and Verify
    await PIMpage.SearchEmployees(EmployeeData);
  }
);
