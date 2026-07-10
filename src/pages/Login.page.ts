import { Locator, Page } from '@playwright/test';
import { env } from '../config/env.config';

export class LoginPage {
    readonly page: Page;

    readonly usernameInput: Locator;   
    readonly passwordInput: Locator;   
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page; 
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.getByRole('button', { name: 'Log In' });
    }

    async login(userName: string = env.userName, password: string = env.password): Promise<void> {
        await this.page.goto(env.baseURL);
        await this.usernameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}