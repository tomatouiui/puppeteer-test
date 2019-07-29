const puppeteer = require('puppeteer');
const fs = require('fs-extra');

(async () => {
  const browser = await puppeteer.launch({ headless: false});
  const page = await browser.newPage();
  page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36');
  const outname = 'out-bili.csv';

  await page.goto('https://www.bilibili.com/v/anime/serial/?spm_id_from=333.334.b_7072696d6172795f6d656e75.9#/63700/click/0/1/2019-07-18,2019-07-25');
  await page.waitForSelector('ul.vd-list');

  await fs.writeFile(outname, '排名,番剧,播放次数,弹幕数量\n');

  await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});
  
  const result = await page.evaluate(() => {
        try {
            var data = [];
            $('ul.vd-list li').each(function() {
                const title = $(this).find('div.r a').text();
                const playno = $(this).find('.v-info .v-info-i:eq(0) span').text();
                const danmuno = $(this).find('.v-info .v-info-i:eq(1) span').text();

                data.push({
                    'title' : title,
                    'playno'   : playno,
                    'danmuno' : danmuno,
                });
            });
            return data; // Return our data array
        } catch(err) {
            reject(err.toString());
        }
  });
      
  await browser.close();

  // ok, let's log blog titles...
  for(var i = 0; i < result.length; i++) {
        console.log('番剧: ' + result[i].title);
        await fs.appendFile(outname, `"${i+1}","${result[i].title}","${result[i].playno}","${result[i].danmuno}"\n`);
  }

})();
