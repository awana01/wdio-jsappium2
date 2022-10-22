const SELECTORS = {
    ANDROID: {
        TEXT: '*//android.widget.TextView',
        TEXT_FIELD: '*//android.widget.EditText',
    },
    IOS: {
        GENERIC_TEXT: null,
        XPATH_TEXT: '*//XCUIElementTypeStaticText',
        TEXT_FIELD: '*//XCUIElementTypeTextField',
    },
};

/**
 * Get the text of an element
 *  NOTE:
 *      This method will contain all the text of the component,
 *      including all the child components
 *
 * @param {element} element
 * @param {boolean} isXpath
 *
 * @return {string}
 */
function getTextOfElement (element, isXpath = false) {
    let visualText;
    try {
        if (driver.isAndroid) {
            visualText = element.getText(SELECTORS.ANDROID.TEXT);
        } else {
            visualText = element.getText(isXpath ? SELECTORS.IOS.XPATH_TEXT : SELECTORS.IOS.GENERIC_TEXT);
        }
    } catch (e) {
        visualText = element.getText();
    }

    if (typeof visualText === 'string') {
        return visualText;
    }

    return Array.isArray(visualText) ? visualText.join(' ') : '';
}

/**
 * Get the time difference in seconds
 *
 * @param {number} start    the time in milliseconds
 * @param {number} end      the time in milliseconds
 */
function timeDifference (start, end) {
    const elapsed = (end - start) / 1000;
    console.log('elapsed = ', elapsed, ' seconds');
}


function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();  
    } while (currentDate - date < milliseconds);
  }
/**
 * 
 * @param {*} data: string to sendkeys 
 * @param {*} webEle: text box element
 */
async function sendKeyAsUser(data,webEle){
    let dataX = data.split('')
    for(let s=0;s<dataX.length;s++){
      await webEle.sendKeys(data.charAt(s))
      //await webEle.addValue(data.charAt(s))
      sleep(500)
    }
}

async function hideKeyBoardIfShow(){
    if(await browser.isKeyboardShown()){
        await browser.hideKeyboard()
        sleep(1200)
    }
}


async function loadTestData(fileName=''){
    const fs = require('fs')
    var datafile1 = require.resolve('../data-files/'+fileName)   
    console.log(datafile1)            //'../../data-files/google.json');
    const data = fs.readFileSync(datafile1, "utf8");
    var arr = null
    try {
        arr = JSON.parse(data)
        console.log(arr);
    } catch (err) {
        console.error(err);
    }
    return arr;
}

async function writeJsonFile(jsonData){
    // file system module to perform file operations
    const fs = require('fs');
    const pathx = require('path').resolve('.')
    console.log("path:"+pathx+'/datafiles')
    // json data
    //var jsonData = '{"persons":[{"name":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}';

    // parse json
    var jsonObj = JSON.parse(jsonData);
    console.log(jsonObj);

    // stringify JSON Object
    var jsonContent = JSON.stringify(jsonObj);
    console.log(jsonContent);

    fs.appendFile("output.json", jsonContent, 'utf8', function (err) {
        if (err) {
           console.log("An error occured while writing JSON Object to File.");
           return console.log(err);
        }
       console.log("JSON file has been saved.");
    });
}

/**
 * 
 * @param {*} list or Array 
 * @returns 
 */
function get_random (list) {
    return list[Math.floor((Math.random()*list.length))];
  }

/**
 * 
 * @param {*} jsonData as dictionary 
 * @param {*} jsonFilename json file name
 */
function writeTestDataToJson(jsonData,jsonFilename){
    var fs = require('fs');
    var baseFile = require('path').resolve('.')

    var jsonFile = baseFile+'/test/data-files/'+jsonFilename
    console.log(jsonFile)

    var data = {}
    data.testdata = []
    var obj = jsonData
    data.testdata.push(obj)
    
    fs.writeFile (jsonFile, JSON.stringify(data), function(err) {
          if (err) throw err;
             console.log('complete');
    });
}


/**
 * 
 * @param {*} stringData 
 */
export async function sendKeyCodeData(stringData=""){
     let strLen = stringData.length
     console.log("length of string:"+strLen)
     
     for(let x=0;x<strLen;x++){
        
        let keycode = await sendAndroidKeyCode(stringData[x])
        console.log(`char ${stringData[x]} Android keycode ${keycode}`)
        //await browser.pressKeyCode(keycode)
     }
}


/**
 * 
 * @param {*} androidKey 
 * @returns a keycode int code
 */
async function sendAndroidKeyCode(androidKey){
    let x;
    switch(androidKey){
        
        case "a": x=29; await browser.pressKeyCode(x);  break; 
        case "A": await browser.pressKeyCode(29,193);   break;
        case "b":  x=30; await browser.pressKeyCode(x); break;  
        case "B": await browser.pressKeyCode(30,193);   break;
        case "c":  x=31; await browser.pressKeyCode(x); break; 
        case "C": await browser.pressKeyCode(31,193);   break;
        case "d":  x=32; await browser.pressKeyCode(x); break; 
        case "D": await browser.pressKeyCode(32,193);   break;
        case "e":  x=33; await browser.pressKeyCode(x); break; 
        case "E": await browser.pressKeyCode(33,193);   break;
        case "f":  x=34; await browser.pressKeyCode(x); break; 
        case "F": await browser.pressKeyCode(34,193);   break;
        case "g":  x=35; await browser.pressKeyCode(x); break; 
        case "G": await browser.pressKeyCode(35,193);   break;
        case "h":  x=36; await browser.pressKeyCode(x); break; 
        case "H": await browser.pressKeyCode(36,193);   break;
        case "i":  x=37; await browser.pressKeyCode(x); break; 
        case "I": await browser.pressKeyCode(37,193);   break;
        case "j":  x=38; await browser.pressKeyCode(x); break; 
        case "J": await browser.pressKeyCode(38,193);   break;
        case "k":  x=39; await browser.pressKeyCode(x); break; 
        case "K": await browser.pressKeyCode(39,193);   break;
        case "l":  x=40;  await browser.pressKeyCode(x);break; 
        case "L": await browser.pressKeyCode(40,193);   break;
        case "m":  x=41; await browser.pressKeyCode(x); break; 
        case "M": await browser.pressKeyCode(41,193);   break;
        case "n":  x=42; await browser.pressKeyCode(x); break; 
        case "N": await browser.pressKeyCode(42,193);   break;
        case "o":  x=43; await browser.pressKeyCode(x); break; 
        case "O": await browser.pressKeyCode(43,193);   break;
        case "p":  x=44; await browser.pressKeyCode(x); break; 
        case "P": await browser.pressKeyCode(44,193);   break;
        case "q":  x=45; await browser.pressKeyCode(x); break; 
        case "Q": await browser.pressKeyCode(45,193);   break;
        case "r":  x=46; await browser.pressKeyCode(x); break; 
        case "R": await browser.pressKeyCode(46,193);   break;
        case "s":  x=47; await browser.pressKeyCode(x); break; 
        case "S": await browser.pressKeyCode(47,193);   break;
        case "t":  x=48; await browser.pressKeyCode(x); break; 
        case "T": await browser.pressKeyCode(48,193);   break;
        case "u":  x=49; await browser.pressKeyCode(x); break; 
        case "U": await browser.pressKeyCode(49,193);   break;
        case "v":  x=50; await browser.pressKeyCode(x); break; 
        case "V": await browser.pressKeyCode(50,193);   break;
        case "w":  x=51; await browser.pressKeyCode(x); break; 
        case "W": await browser.pressKeyCode(51,193);   break;
        case "x":  x=52; await browser.pressKeyCode(x); break; 
        case "X": await browser.pressKeyCode(52,193);   break;
        case "y":  x=53; await browser.pressKeyCode(x); break; 
        case "Y": await browser.pressKeyCode(53,193);   break;
        case "z":  x=54; await browser.pressKeyCode(x); break; 
        case "Z": await browser.pressKeyCode(54,193);   break;
        case ":": x=74; await browser.pressKeyCode(x,193); break;
        case "/": x=76; await browser.pressKeyCode(x,193); break;
        case "searchKey": x=84; await browser.pressKeyCode(x); break;
        default:
            console.log("Keycode not defined")
            x=0;
            break;
    }
    return x;
        
}

  module.exports = {
                getTextOfElement, 
                hideKeyBoardIfShow,
                timeDifference,
                sleep,
                sendKeyAsUser,
                loadTestData,
                writeJsonFile,
                get_random,
                writeTestDataToJson,
                sendKeyCodeData

            };