import {sleep,sendKeyAsUser,hideKeyBoardIfShow} from '../../helpers/utils'

describe("Android Mi-A2 copy contacts",()=>{
    before(async ()=>{
        await browser.startActivity("com.google.android.contacts","com.android.contacts.activities.PeopleActivity")
    })

    after(async()=>{
        console.log("press back button twice to exit app on device")
        await browser.pressKeyCode(4)
        await browser.pressKeyCode(4)
    })
    
    it("copy contacts data into dict test",async()=>{
        
        console.log("get dimension of list view of contact view element")
        // let contactEle = await $('[resource-id="android:id/list"]')
        // let contactEle_h = (await contactEle.getSize()).height
        // let contactEle_w = (await contactEle.getSize()).width

        // console.log(`contact list h:${contactEle_h} w:${contactEle_w}`)
        // let contactsName = await $$('[resource-id="com.google.android.contacts:id/cliv_name_textview"]')
        
        // for(let x=0;x<contactsName.length;x++){
        //     console.log(`name: ${await contactsName[x].getAttribute('text')}`)
        // }

        // console.log('scroll contacts on screen')
        // await browser.touchAction([
        //           {action: 'press', x:contactEle_w/2, y:contactEle_h+20},
        //           {action: 'wait', ms: 2000},
        //           {action: 'moveTo', x: contactEle_w/2, y: 100}, 
        //           'release'
        // ]);
        // sleep(4000)
        // await browser.takeScreenshot()
        await scrollOnContactList(5)
    })

})
// //android.widget.ListView[@resource-id='android:id/list']/android.view.ViewGroup/android.widget.ImageView[@index='1']
/**
 * 
 * @param {*} scrollTimes 
 */
async function scrollOnContactList(scrollTimes){
    let nameSet = new Set();
    for(let i=0;i<scrollTimes;i++){
        let contactEle = await $('[resource-id="android:id/list"]')
        let contactEle_h = (await contactEle.getSize()).height
        let contactEle_w = (await contactEle.getSize()).width

        console.log(`contact list h:${contactEle_h} w:${contactEle_w}`)
        let contactsName = await $$('[resource-id="com.google.android.contacts:id/cliv_name_textview"]')
        

        for(let x=0;x<contactsName.length;x++){
            console.log(`name: ${await contactsName[x].getAttribute('text')}`)
            nameSet.add(await contactsName[x].getAttribute('text'))
        }

        console.log('scroll contacts on screen')
        await browser.touchAction([
                  {action: 'press', x:contactEle_w/2, y:contactEle_h+20},
                  {action: 'wait', ms: 2000},
                  {action: 'moveTo', x: contactEle_w/2, y: 100}, 
                  'release'
        ]);
        sleep(1000)
        await browser.takeScreenshot()
    }
    console.log("====Names Start=====")
    nameSet.forEach (function(name) {
        console.log("name: "+name)
      })
    console.log("====Names Ends======")
}