import * as basePath from 'path'
import {sleep} from '../../helpers/utils'
const projPath = basePath.resolve('.')


describe('install and uninstall app',()=>{
    before(async()=>{

        let appPath = projPath+'/testApps/emerytech.apk'
        console.log(appPath)
        if(!await driver.isAppInstalled('app.work.emerytech.io.stg')){
            await driver.installApp(appPath)
            sleep(7000)
        }
        await driver.startActivity('app.work.emerytech.io.stg','com.property.ility.ui.SplashActivity')
        
    })

    after(async()=>{
        await driver.removeApp('app.work.emerytech.io.stg')
    })

    it('install app',async()=>{
        console.log('trying to test app')
        sleep(6000)
        await (await $('[resource-id="app.work.emerytech.io.stg:id/emailEditText"]')).click()
        await (await $('[resource-id="app.work.emerytech.io.stg:id/emailEditText"]')).setValue("mymailid@yopmail.com")
        await driver.hideKeyboard()
        await (await $('[resource-id="app.work.emerytech.io.stg:id/passwordEditText"]')).click()
        await (await $('[resource-id="app.work.emerytech.io.stg:id/passwordEditText"]')).setValue("Ulir@12345")
        //app.work.emerytech.io.stg:id/emailEditText
        //app.work.emerytech.io.stg:id/passwordEditText
    })
})