import {sleep,sendKeyAsUser,hideKeyBoardIfShow,sendKeyCodeData} from '../../helpers/utils'

describe("Android Mi A2 Amazon app test",()=>{
    before(async ()=>{
        // await browser.startActivity("in.amazon.mShop.android.shopping","com.amazon.mShop.navigation.MainActivity")
        //await browser.startActivity("in.amazon.mShop.android.shopping","com.amazon.mShop.home.HomeActivity")
    
        console.log("check for phone lock")
        if( await $$("[resource-id='com.android.systemui:id/keyguard_glide_tip_view']").length>0){
            console.log("swipe element found")
            // let scroll = await $("[resource-id='com.android.systemui:id/keyguard_glide_tip_view']")
            // let dimX = await (await scroll.getLocation()).x
            // let dimY = await (await scroll.getLocation()).y
            // let scrollW = (await scroll.getSize()).width

            // await browser.touchAction([ 
            //     {action: 'press', x: scrollW/2, y: dimY},
            //     { action: 'wait', ms: 1000},
            //     { action: 'moveTo', x: scrollW/2, y: 30}, 
            //     'release' 
            // ]);
            let scrollId2 ="com.android.systemui:id/keyguard_glide_tip_view"
            let veriScroll2 = "new UiScrollable(new UiSelector().scrollable(true).resourceId(\""+scrollId2+"\")).flingBackward()"
            await $(`android=${veriScroll2}`)
            sleep(1000)
        }
    
    
    
    
    })

    after(async()=>{
        console.log("press back button twice to exit app on device")
        await browser.pressKeyCode(4)
        await browser.pressKeyCode(4)
    })
    it("go to amazon app",async()=>{
          
        sleep(5000);
        console.log("swipe horizointalyy on category options")

        console.log( await driver.getContexts())
        
        //await driver.switchContext('WEBVIEW_chrome');
        await driver.switchContext('NATIVE_APP')
        let id="grid-top-1"
        let eleText = "More"
        //.setSwipeDeadZonePercentage(0.8)
        let horizScroll2 = "new UiScrollable(new UiSelector().scrollable(true).resourceId(\""+id+"\")).setAsHorizontalList().setSwipeDeadZonePercentage(0.5).scrollIntoView(new UiSelector().textContains(\""+eleText+"\"))";
        
        let xpath = "//android.view.View/android.view.View/android.view.View/android.widget.Image"
        console.log(await $$(`${xpath}`).length)
        console.log(await (await $$(`${xpath}`)[0]).getAttribute('text'))

        await $(`android=${horizScroll2}`)
        sleep(4000)

        let scroll = await $("//android.view.View[@resource-id='grid-top-1']/android.view.View/android.view.View/android.view.View/android.view.View")
        let dimX = await (await scroll.getLocation()).x
        let dimY = await (await scroll.getLocation()).y

        let scrollW = (await scroll.getSize()).width
        
        console.log(`x:${dimX} y:${dimY} element width: ${scrollW}`)
        
        console.log("touch action perform on element co-ordinates")
        for(let i=0;i<4;i++){
               await browser.touchAction([ 
                                {action: 'press', x: scrollW-100, y: dimY},
                                { action: 'wait', ms: 1000},
                                { action: 'moveTo', x: 10, y: dimY}, 
                                'release' 
                            ]);
        
                sleep(1000)
        }
        sleep(2000)
        //await sendKeyCodeData("startstring")
    })

    it("search product on search box as user",async ()=>{

        let productTxt = "MoBiLeX://"
        let searchBox = await $('[resource-id="in.amazon.mShop.android.shopping:id/chrome_search_hint_view"]')
        
        await searchBox.click()
        sleep(500)
        console.log(`enter data: [${productTxt}] as user`)
        await sendKeyCodeData(productTxt)
        sleep(400)
        console.log("clear search box using back button")
        for(let i=0;i<productTxt.length;i++){
            await browser.pressKeyCode(4)
        }

        
    })
    it("search product on search box",async()=>{
        let productTxt = "mobile"
        let searchBox = await $('[resource-id="in.amazon.mShop.android.shopping:id/chrome_search_hint_view"]')
        
        await searchBox.click()
        sleep(500)
        console.log(`enter data: [${productTxt}] as user`)
        await sendKeyCodeData(productTxt)
        sleep(400)

        let searchSuggesttion = "//android.view.View[@resource-id='']/android.view.View/android.widget.Button[1]"
        console.log(await $$(`${searchSuggesttion}`).length)
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