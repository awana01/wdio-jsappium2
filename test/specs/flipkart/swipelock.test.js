import {sleep,sendKeyAsUser,hideKeyBoardIfShow,sendKeyCodeData} from '../../helpers/utils'

describe("Android Mi A2 Amazon app test",()=>{
    before(async ()=>{
        // await browser.startActivity("in.amazon.mShop.android.shopping","com.amazon.mShop.navigation.MainActivity")
        //await browser.startActivity("in.amazon.mShop.android.shopping","com.amazon.mShop.home.HomeActivity")
    
        console.log("check for phone lock")
        if( await $$("[resource-id='com.android.systemui:id/keyguard_glide_tip_view']").length>0){
            console.log("swipe element found")
            let scroll = await $("[resource-id='com.android.systemui:id/keyguard_glide_tip_view']")
            let dimX = await (await scroll.getLocation()).x
            let dimY = await (await scroll.getLocation()).y
            let scrollW = (await scroll.getSize()).width
            console.log(`x:${dimX} y:${dimY} element width: ${scrollW}`)
            
            // // simple touch action on element
            // await browser.touchAction({
            //                     action: 'tap',
            //                     element: scroll
            //               });
            console.log('tap on screen')
            await browser.touchAction([
                  {action: 'press', x:scrollW/2, y:dimY},
                  {action: 'wait', ms: 500},
                  {action: 'moveTo', x: scrollW/2, y: 10}, 
                   'release',
                  //{element: scroll }

        ]);
    }
            // let scrollId2 ="com.android.systemui:id/keyguard_glide_tip_view"
            // let veriScroll2 = "new UiScrollable(new UiSelector().scrollable(true).resourceId(\""+scrollId2+"\")).flingToBeginning(1)"
            // await $(`android=${veriScroll2}`)
            sleep(3000)
            // await driver.startActivity("in.amazon.mShop.android.shopping","com.amazon.mShop.home.HomeActivity",
            //                 // "com.amazon.mShop.home.HomeActivity",
            //                 "com.amazon.mShop.navigation.MainActivity",
                            
            //                 )

        // }
        console.log("running activity using adb command")
        var process = require('child_process');
        process.exec('adb -s 192.168.1.103:5555 shell am start -n in.amazon.mShop.android.shopping/com.amazon.mShop.home.HomeActivity',async function (err,stdout,stderr) {
            if (err) {
              console.log("\n"+stderr);
            } else {
              sleep(3000)
              console.log(stdout);
            }
        });
    
    
    
    
    })

    after(async()=>{
        console.log("press back button twice to exit app on device")
        await browser.pressKeyCode(4)
        await browser.pressKeyCode(4)

        //close the app : adb -s 192.168.1.103:5555 shell am force-stop in.amazon.mShop.android.shopping
    })
    it("search product on search box",async()=>{
        let productTxt = "mobile"
        let searchBox = await $('[resource-id="in.amazon.mShop.android.shopping:id/chrome_search_hint_view"]')
        
        await searchBox.click()
        sleep(500)
        console.log(`enter data: [${productTxt}] as user`)
        await sendKeyCodeData(productTxt)
        sleep(400)

        let searchSuggesttion = "//android.view.View[@resource-id='attach-to-me']/android.view.View/android.widget.Button[@index='1']"
        console.log(await $$(`${searchSuggesttion}`).length)
        
        console.log("print all suggestion for search")
        for(let i=0;i<await $$(`${searchSuggesttion}`).length;i++){
            console.log(await $$(`${searchSuggesttion}`)[i].getAttribute('text'))
        }



    })

    
})


// await browser.performActions([
        //         {
        //             type: 'pointer',
        //             id: 'finger1',
        //             parameters: { pointerType: 'touch' },
        //             actions: [
        //                 { type: 'pointerMove', duration: 0, x: 300, y: dimY/2 },
        //                 { type: 'pointerDown', button: 0 },
        //                 { type: 'pause', duration: 100 },
        //                 { type: 'pointerMove', duration: 700, origin: 'pointer', x: scrollW-100, y: dimY/2 },
        //                 { type: 'pointerUp', button: 0 },
        //             ],
                // }
            // ])