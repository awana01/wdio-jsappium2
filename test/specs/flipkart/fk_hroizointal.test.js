import {sleep,sendKeyAsUser,hideKeyBoardIfShow} from '../../helpers/utils'

describe("Android Mi A2 flipkart test",()=>{
    before(async ()=>{
        await browser.startActivity("com.flipkart.android","com.flipkart.android.activity.HomeFragmentHolderActivity")
    })

    after(async()=>{
        console.log("press back button twice to exit app on device")
        await browser.pressKeyCode(4)
        await browser.pressKeyCode(4)
    })
    it("go to flipkart app",async()=>{
        // await browser.startActivity("com.flipkart.android","com.flipkart.android.SplashActivity")
        
        sleep(2000);
        console.log("On flipkart app")
        
        let scroll = await $("//android.widget.HorizontalScrollView[@index=1]/android.view.ViewGroup")
        let dimX = await (await scroll.getLocation()).x
        let dimY = await (await scroll.getLocation()).y

        let scrollW = (await scroll.getSize()).width
        
        console.log(`x:${dimX} y:${dimY} element width: ${scrollW}`)
        let eleText = "Joe"
        // let horizScroll = "new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().setSwipeDeadZonePercentage(0.8).scrollIntoView(new UiSelector().className(android.widget.HorizontalScrollView).index(1).childSelector(new UiSelector().className(android.view.ViewGroup).index(0)))"
        // //working fine code peice
        // let horizScroll = "new UiScrollable(new UiSelector().scrollable(true).className(android.widget.HorizontalScrollView).index(1)).setAsHorizontalList().setSwipeDeadZonePercentage(0.8).setMaxSearchSwipes(6).scrollIntoView(new UiSelector().className(android.view.ViewGroup).index(18))" //.textContains(\""+eleText+"\"))";
        // await (await $(`android=${horizScroll}`)).click()
        
        let ImageEle = "//android.widget.HorizontalScrollView[@index='1']/android.view.ViewGroup[@index='0']//android.widget.ImageView[@index='0']" //android.view.ViewGroup[0]/android.view.ViewGroup[0]/android.widget.ImageView[0]"
        let horizScroll2 = "new UiScrollable(new UiSelector().scrollable(true).className(android.widget.HorizontalScrollView).index(1)).setAsHorizontalList().setSwipeDeadZonePercentage(0.8).setMaxSearchSwipes(1)"
        let myEles =[]
        for(let i=0;i<3;i++){
            await (await $(`android=${horizScroll2}`))
            myEles.push(await $$(`${ImageEle}`))
        }
        console.log(myEles.length)
        sleep(1000)
        await (await $('[text="Search for Products, Brands and More"]')).click()
        await browser.pressKeyCode(31) //keyput for c char
        sleep(500)
        await browser.pressKeyCode(31)
        sleep(2000)
        await hideKeyBoardIfShow()
        console.log("press back button on device")
        await browser.pressKeyCode(4)
        
    })

    it("test on flipkart drawer button",async()=>{
        await $('~Drawer').click()
        let eleText = "Legal"
        let drawerScroll = "new UiScrollable(new UiSelector().scrollable(true).resourseId(com.flipkart.android:id/flyout_recycler_view)).scrollIntoView(new UiSelector().textContains(\""+eleText+"\"))";
        await $(`android=${drawerScroll}`)
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
        //         }
        //     ])
