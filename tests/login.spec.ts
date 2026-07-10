import { test, expect } from '@playwright/test';
import inicioSesion from '../src/data/inicioSesion.json';
import { env } from '../src/config/env.config';
import { LoginPage } from '../src/pages/Login.page';

for (const lInicio of inicioSesion) {
  test(`Autenticación Usuario - ${env.userName} :: ${lInicio.statusCase}`, async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(lInicio.userName, lInicio.password);

    if (lInicio.statusCase === 'acceso_exitoso') {
          await expect(page).toHaveURL(lInicio.assert);
    } else if (lInicio.statusCase === 'usuario_noexiste') {
        const mensajeError = page.locator('#rightPanel p.error');
        await expect(mensajeError).toBeVisible();
        await expect(mensajeError).toHaveText(lInicio.assert);
    }

    const captura = await page.screenshot({ fullPage: true });
    await testInfo.attach(`Evidencia-${lInicio.userName}-${lInicio.statusCase}`, {
        body: captura,
        contentType: 'image/png'
    });
 });
}