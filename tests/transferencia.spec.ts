import { test, expect } from '@playwright/test';
import transferencia from '../src/data/transferencia.json';
import { LoginPage } from '../src/pages/Login.page';

for(const lTransferencia of transferencia){
    test(`Transferencia - ${lTransferencia.statusCase}`, async ({ page }, testInfo) => {
        const loginPage = new LoginPage(page); 
        await loginPage.login();

        await page.getByRole('link', { name: 'Transfer Funds' }).click();
        await page.locator('#amount').click();
        await page.locator('#amount').fill(lTransferencia.amount);
        await page.locator('#fromAccountId').selectOption(lTransferencia.origin_account);  
        await page.locator('#toAccountId').selectOption(lTransferencia.destination_account); 
        await page.getByRole('button', { name: 'Transfer' }).click();
        const mensajeCompleto = page.locator('#showResult > p').first();

        if (lTransferencia.statusCase === 'transferencia_exitosa'){                   
            await expect(mensajeCompleto).toHaveText(lTransferencia.assert);
        }else if (lTransferencia.statusCase === 'fondos_insuficientes') {            
            await expect(mensajeCompleto).toHaveText(lTransferencia.assert);
        }

        const captura = await page.screenshot({ fullPage: true });
        await testInfo.attach(`Evidencia-${lTransferencia.statusCase}`, {
            body: captura,
            contentType: 'image/png'
        });

    });
}