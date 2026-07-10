# Automatización QA — ParaBank (Playwright + TypeScript)

Automatización E2E **data-driven** de ParaBank (`parabank.parasoft.com`) con **Playwright + TypeScript** y **Page Object Model**. Cada escenario (registro, login, transferencia, retiro) lee sus casos desde un archivo JSON.

## Estructura

```
proyecto/
├── src/
│   ├── config/
│   │   └── env.config.ts          # baseURL, userName, password (entorno)
│   ├── data/
│   │   ├── crearUsuario.json
│   │   ├── inicioSesion.json
│   │   ├── transferencia.json
│   │   └── retiro.json
│   └── pages/
│       └── Login.page.ts          # Page Object del login (data-driven)
├── tests/
│   ├── CrearUsuario.spec.ts
│   ├── login.spec.ts
│   ├── transferencia.spec.ts
│   └── retiro.spec.ts
├── features/                       # Especificacion BDD (Gherkin, español)
│   ├── registroCuenta.feature
│   ├── inicioSesion.feature
│   ├── transferenciaFondos.feature
│   └── retiroFondos.feature
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

## Requisitos

| Herramienta | Versión |
|-------------|---------|
| Node.js | >= 18.19.0 (recomendado 20 o 22 LTS) — `node -v` |
| npm | >= 9 |

## Dependencias (versiones sugeridas)

| Paquete | Versión |
|---------|---------|
| @playwright/test | 1.55.0 |
| typescript | 5.7.2 |
| @types/node | 22.10.2 |
| dotenv | 16.4.7 |

## Instalación paso a paso

```bash
npm install
npx playwright install          # navegadores; en Linux: npx playwright install --with-deps
```

Crea `.env` en la raíz (usado por `env.config.ts`):

```
BASE_URL=https://parabank.parasoft.com/parabank/index.htm
USER_NAME=tu_usuario
PASSWORD=tu_clave
```

## Configuración crítica

`playwright.config.ts` debe apuntar a la carpeta real de specs. Con la estructura de arriba:

```ts
testDir: './tests',
```

> Un `testDir: './test'` (singular) produce `0 tests in 0 files`.

## Comandos de ejecución

| Acción | Comando |
|--------|---------|
| Todos los tests | `npx playwright test` |
| Con navegador visible | `npx playwright test --headed` |
| Un archivo | `npx playwright test tests/login.spec.ts` |
| Un caso por nombre | `npx playwright test -g "acceso_exitoso"` |
| Listar (diagnóstico) | `npx playwright test --list` |
| Debug (inspector) | `npx playwright test --debug` |
| Modo UI | `npx playwright test --ui` |
| Reporte HTML | `npx playwright show-report` |
| Un solo navegador | `npx playwright test --project=chromium` |

## Depuración recomendada

Instala la extensión **Playwright Test for VSCode**, abre el Test Explorer, expande hasta el caso generado por el loop data-driven y usa **Debug Test** sobre ese caso. El debugger genérico de Node no reconoce los tests generados dinámicamente y reporta "no output".

## Correspondencia caso ↔ feature

| JSON (statusCase) | Feature |
|-------------------|---------|
| crearUsuario: usuario_creado / error_confirm / usuario_duplicado / ssn_vacio | registroCuenta.feature |
| inicioSesion: acceso_exitoso / usuario_noexiste | inicioSesion.feature |
| transferencia: transferencia_exitosa / fondos_insuficientes | transferenciaFondos.feature |
| retiro: retiro_exitoso / fondos_insuficientes / monto_invalido | retiroFondos.feature (pendiente de flujo real) |

