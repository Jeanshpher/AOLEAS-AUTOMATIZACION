import { config } from 'dotenv';
config()

export const env = {
    baseURL: process.env.baseURL ?? 'https://parabank.parasoft.com/parabank/index.htm',
    userName: process.env.userName ?? 'aoleas002',
    password: process.env.password ?? 'aoleas002'
}
