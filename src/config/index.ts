import { Config } from "../types"

export const configSelector = (env:string):Config => {
    switch(env) {
        case 'local':
            return {
                api: {
                    account: 'http://localhost:3002',
                    workspace: 'http://localhost:3001',
                    submgr: 'https://localhost:3003' ,
                }
            }
        case 'development':
            return {
                api: {
                    account: 'https://portal.dev.workspacenow.cloud/acctsvc',
                    workspace: 'https://portal.dev.workspacenow.cloud/wspsvc',
                    submgr: 'https://portal.dev.workspacenow.cloud/submgr',
                }
            }
        case 'production':
            return {
                api: {
                    account: 'https://portal.dev.workspacenow.cloud/acctsvc',
                    workspace: 'https://portal.dev.workspacenow.cloud/wspsvc',
                    submgr: 'https://portal.dev.workspacenow.cloud/submgr',
                }
            }
        default:
            return {
                api: {
                    account: 'https://portal.dev.workspacenow.cloud/acctsvc',
                    workspace: 'https://portal.dev.workspacenow.cloud/wspsvc',
                    submgr: 'https://portal.dev.workspacenow.cloud/submgr',
                }
            }
    }
}