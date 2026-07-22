const ExcelJS = require("exceljs");
class Exceloperations {
  constructor() {
    this.workbook = new ExcelJS.Workbook();
  }

  async ReadExcelData(filePath, sheetName) {
    const Employeedata = [];
    await this.workbook.xlsx.readFile(filePath);
    const worksheet = this.workbook.getWorksheet(sheetName);
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber == 1) {
        return;
      }

      let employee = {};
      row.eachCell((cell, colNumber) => {
        if (colNumber == 1) {
          employee.firstName = cell.value;
        } else if (colNumber == 2) {
          employee.middleName = cell.value;
        } else if (colNumber == 3) {
          employee.lastName = cell.value;
        }
      });
      Employeedata.push(employee);
    });
    return Employeedata;
  }
}

module.exports = {Exceloperations}
