const { expect } = require("@playwright/test");

expect
class LoginPage
{
    constructor (page)
    {
        this.page = page;
        this.username = this.page.getByPlaceholder("Username");
        this.password = this.page.getByPlaceholder("Password");
        this.loginBtn = this.page.getByRole('button');
        this.dashboard = this.page.locator(".oxd-topbar-header-title .oxd-topbar-header-breadcrumb-module");
    }

    async ValidLogin(username,password)
    {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
        await expect(this.dashboard).toBeVisible();
    }

    async goTo()
    {
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    }
}
module.exports = {LoginPage} 