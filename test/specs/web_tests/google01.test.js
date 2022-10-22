import {sleep} from '../../helpers/utils'
import report from '@wdio/allure-reporter'
import * as EC from 'wdio-wait-for'
import {Attachment} from '@wdio/allure-reporter'

const basePath = require('path').resolve('.')

describe("google test",()=>{

    before(async ()=>{
        await browser.url("https://www.google.com/")
        await browser.waitUntil(EC.elementToBeClickable("[name='q']"),
          {
              timeout:15000,
              timeoutMsg: "search box not found"
          }
        )
    })

    it("take element screenshot",async ()=>{
        
        let winHandles = await browser.getWindowHandle()
        let contexts = await browser.getWindowHandles()
        console.log(contexts)
        let dialogiFrame= browser.$('//iframe[@role="presentation"]');
        await browser.switchToFrame(0)
        report.addStep("close dialog", "google dialog goint to close")
        if(await $$("//*[@aria-label='Sign in to Google']").length>0){
            console.log("element found")
            await $("//button[@aria-label='No thanks']").click()
            report.addStep("dialog closed", "google dialog closed")
            sleep(4000)
        }
        await browser.switchToWindow(winHandles)
        sleep(2000)
        let google = await $('[alt="Google"]')
        await google.saveScreenshot("./img.png")
        // report.addAttachment("image","E:/MyWorkSpace/wdo-samples/wdio-jsappium/img.png","image/png")
        
        let filex = eleScreenShot(google,'')
        //report.addAttachment("myScreenshot",filex,"image/png")
        
        report.addStep("my test step1") 
        // report.addAttachment("step1", "simple text add attachment", 'plain/text')
    
        await (await $('[name="q"]')).setValue("webdriverio\n")
        sleep(4000)
        report.addStep("my test step2",await $('[id="result-stats"]').saveScreenshot('./result.png')) 
        await $('[id="result-stats"]').saveScreenshot('./result.png')
    
        var img = basePath+"/elem1.png"
        console.log("path: "+img)
        var name1 = 'ERROR-chrome-' + Date.now()
        console.log(name1)
        //report.addAttachment("some attachment",img,"image/png")
        // report.addAttachment("Screenshot", Buffer.from(img, "base64"))
        report.addAttachment("Screenshot",await $('[id="result-stats"]').saveScreenshot('./result.png'))
        report.addStep("my test step3") 
        

    })
    it("add dictionry to json file",async ()=>{

        var dict = {
            "one" : [15, 4.5],
            "two" : [34, 3.3],
            "three" : [67, 5.0],
            "four" : [32, 4.1]
          };
       var dictstring = JSON.stringify(dict);
       var fs = require('fs');
       var jsonFile = basePath+'/test/data-files/dict.json'
       fs.writeFileSync(jsonFile, dictstring);

       var input = [{key:"key1", value:"value1"},{key:"key2", value:"value2"}];
       var result = {};

       for(var i = 0; i < input.length; i++){
           result[input[i].key] = input[i].value;
       }
       console.log(result); // Just for testing

       for (var item in result) {
        console.log('key:' + item + ' value:' + dict[item]);
        // Output
        // key:key value:value
        // key:anotherKey value:anotherValue
      }
    })



})

async function eleScreenShot(webElement, fileName){
    let image = await webElement.saveScreenshot("E:/MyWorkSpace/wdo-samples/wdio-jsappium/img.png")
    return fs.writeFileSync(file, image, "base64")
  }