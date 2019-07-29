/**
 * Created by Toma on 2019/7/26.
 */
//promise + async + await

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

;(async()=> {

    const pathToExtension = require('path').join(__dirname, '../chrome-mac/Chromium.app/Contents/MacOS/Chromium');
    let browser = await puppeteer.launch({
        headless: false,
        //executablePath: pathToExtension
        defaultViewport: {width:1100,height:600},
        args: [`--window-size=1100,600`]
    })

    let page = await browser.newPage()
    await page.goto('https://www.google.com/imghp?hl=zh-CN&tab=ri&ogbl')
    await page.type('input[name=q]', '柯南');
    await page.click('.Tg7LZd');

    let downloadPath = path.resolve(__dirname, 'download')

    let count = 0
    let MIN_SIZE = 3 * 1024
    page.on('response', async(res)=> {
        let header = res.headers()
        if(header['content-type']){
            let extName = header['content-type'].split('/')[1]
            let type = header['content-type'].split('/')[0]
            if (type == 'image') {
                let buffer = await res.buffer()
                console.log(buffer.length);
                if(buffer.length > MIN_SIZE){
                    fs.writeFile(`${downloadPath}/${count++}.${extName}`, buffer, ()=> {
                        console.log(`${downloadPath}/${count++}.${extName}:ok`)
                    })
                }
            }
        }
    })

    //await page.waitForNavigation();

    await page.evaluate(()=> {
        return new Promise((resolve, reject)=> {
            let pos = 0
            let i = 0
            let timer = setInterval(()=> {
                window.scrollBy(0, 100)
                let scrollTop = document.documentElement.scrollTop
                if (scrollTop == pos) {
                    if (i > 5) {
                        clearInterval(timer)
                        resolve()
                    } else {
                        i++
                    }
                } else {
                    pos = scrollTop
                    i = 0
                }
            }, 1000)
        })
    })

})();