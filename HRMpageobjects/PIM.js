const { expect } = require("@playwright/test");
const { log } = require("node:console");

class PIMPage {
  constructor(page) {
    this.page = page;
    this.PMIBtn = page.getByRole("link", { name: " PIM " });
    this.addBtn = page.getByRole("link", { name: " Add " });
    this.verifyText = page.locator(".orangehrm-main-title");
    this.firstName = page.locator(".orangehrm-firstname");
    this.middleName = page.locator(".orangehrm-middlename");
    this.lastName = page.locator(".orangehrm-lastname");
    this.fullnameDisplay = page.locator(".orangehrm-edit-employee-name");
    this.saveBTn = page.getByRole("button", { name: "Save" });
    this.addEmployeenavBtn = page.getByRole("link", { name: "Add Employee" });
    this.employeeNameField = page
      .getByRole("textbox", { name: "Type for hints..." })
      .first();
    this.searchBtn = page.getByRole("button", { name: " Search " });
    this.employeeRows = page.locator(".oxd-table-card");
  }

  async NavigateToAddEmployee() {
    await this.PMIBtn.click();
    await expect(this.addBtn).toBeVisible();
    await this.addBtn.click();
    await expect(this.verifyText).toHaveText("Add Employee");
  }
  async AddEmployee(EmployeeData) {
    for (const employee of EmployeeData) {
      await expect(this.firstName).toBeVisible();
      await this.firstName.fill(employee.firstName);
      await this.middleName.fill(employee.middleName);
      await this.lastName.fill(employee.lastName);
      await this.saveBTn.click();
      await expect(this.fullnameDisplay).toBeVisible({
        timeout: 50000,
      });
      const expectedName = `${employee.firstName} ${employee.lastName}`;
      await expect(this.fullnameDisplay).toHaveText(expectedName);
      console.log(await this.fullnameDisplay.textContent());
      console.log(expectedName);
      await this.addEmployeenavBtn.click();
    }
  }
  async SearchEmployees(EmployeeData) {
    await this.PMIBtn.click();

    for (const employee of EmployeeData) {
      await this.employeeNameField.clear();

      // OrangeHRM search expects only the first name
      await this.employeeNameField.fill(employee.firstName);

      await this.searchBtn.click();

      // Wait for search results
      await expect(this.employeeRows.first()).toBeVisible();

      // Find the row containing this employee
      const employeeRow = this.employeeRows
        .filter({ hasText: employee.firstName })
        .filter({ hasText: employee.lastName });

      await expect(employeeRow).toHaveCount(1);
      await expect(employeeRow.first()).toBeVisible();

      await expect(employeeRow.first()).toContainText(employee.firstName);
      await expect(employeeRow.first()).toContainText(employee.lastName);
    }
  }
}

module.exports = { PIMPage };
