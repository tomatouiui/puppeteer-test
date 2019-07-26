'use strict';

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://item.m.jd.com/ware/view.action?wareId=3719293');
    let data = await page.evaluate(() => {
        return {
            jdPrice: document.querySelector('#jdPrice-copy').innerText,
            jdTitle: document.querySelector('.title-text').innerText
        };
    });
    console.log(data);

    await browser.close();
})();
//log { jdPrice: '998.00',jdTitle: '【新年货】荣耀 畅玩6X 4GB 32GB 全网通4G手机 高配版 冰河银' }