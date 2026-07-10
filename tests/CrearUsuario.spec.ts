import { test, expect } from '@playwright/test';
import crearUsuario from '../src/data/crearUsuario.json';
import { env } from '../src/config/env.config';

for (const casoCrear of crearUsuario) {
  test(`Creacción Usuario ${casoCrear.userName} - ${casoCrear.statusCase}`, async ({ page }, testInfo) => {
    await page.goto(env.baseURL);
    await page.getByRole('link', { name: 'Register' }).click();
    await page.locator('[id="customer.firstName"]').click();
    await page.locator('[id="customer.firstName"]').fill(casoCrear.firstName);
    await page.locator('[id="customer.firstName"]').press('Tab');
    await page.locator('[id="customer.lastName"]').fill(casoCrear.lastName);
    await page.locator('[id="customer.lastName"]').press('Tab');
    await page.locator('[id="customer.address.street"]').fill(casoCrear.addres);
    await page.locator('[id="customer.address.street"]').press('Tab');
    await page.locator('[id="customer.address.city"]').fill(casoCrear.city);
    await page.locator('[id="customer.address.city"]').press('Tab');
    await page.locator('[id="customer.address.state"]').fill(casoCrear.State);
    await page.locator('[id="customer.address.state"]').press('Tab');
    await page.locator('[id="customer.address.zipCode"]').fill(casoCrear.zipCode);
    await page.locator('[id="customer.address.zipCode"]').press('Tab');
    await page.locator('[id="customer.phoneNumber"]').fill(casoCrear.phone);
    await page.locator('[id="customer.phoneNumber"]').press('Tab');
    await page.locator('[id="customer.ssn"]').fill(casoCrear.ssn);
    await page.locator('[id="customer.ssn"]').press('Tab');
    await page.locator('[id="customer.username"]').fill(casoCrear.userName);
    await page.locator('[id="customer.username"]').press('Tab');
    await page.locator('[id="customer.password"]').fill(casoCrear.password);
    await page.locator('[id="customer.password"]').press('Tab');
    await page.locator('#repeatedPassword').fill(casoCrear.confirm);
    await page.locator('[id="customer.ssn"]').click();
    await page.getByRole('button', { name: 'Register' }).click();

    let mensajeError;

    switch (casoCrear.statusCase) {
      case 'usuario_creado':
        await expect(page).toHaveURL(casoCrear.assert);
        break;
      case 'error_confirm':
         mensajeError = page.locator('[id="repeatedPassword.errors"]');
        await expect(mensajeError).toBeVisible();
        await expect(mensajeError).toHaveText(casoCrear.assert);
        break;
      case 'usuario_duplicado':
        mensajeError = page.locator('[id="customer.username.errors"]');
        await expect(mensajeError).toBeVisible();
        await expect(mensajeError).toHaveText(casoCrear.assert);
        break;
      case 'ssn_vacio':
        mensajeError = page.locator('[id="customer.ssn.errors"]');
        await expect(mensajeError).toBeVisible();
        await expect(mensajeError).toHaveText(casoCrear.assert);
    }   

    const captura = await page.screenshot({ fullPage: true });
    await testInfo.attach(`Evidencia Crear Usuario ${casoCrear.userName} - ${casoCrear.statusCase}}`, {
      body: captura,
      contentType: 'image/png'
    });
  });
}