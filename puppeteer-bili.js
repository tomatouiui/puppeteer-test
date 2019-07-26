const puppeteer = require('puppeteer');
const fs = require('fs-extra');

(async () => {
  const browser = await puppeteer.launch({ headless: true});
  const page = await browser.newPage();
  page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36');
  const outname = 'out-bili.cvs';

  await page.goto('https://www.bilibili.com/v/anime/serial/?spm_id_from=333.334.b_7072696d6172795f6d656e75.9#/63700/click/0/1/2019-07-18,2019-07-25');
  await page.waitForSelector('ul.vd-list');
  const sections = await page.$$('ul.vd-list li');
  console.log(sections.length);

  await fs.writeFile(outname, 'no,title,play,danmu\n');

  for(let i = 0; i<sections.length; i++){
  	  await page.goto('https://www.bilibili.com/v/anime/serial/?spm_id_from=333.334.b_7072696d6172795f6d656e75.9#/63700/click/0/1/2019-07-18,2019-07-25');
      await page.waitForSelector('ul.vd-list');
      await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});

      const sections = await page.$$('ul.vd-list li');

	    const section = sections[i];
      const button = await section.$('a.title');
      const buttonName = await page.evaluate(button => button.innerText, button);
      const infos = await section.$$('.v-info .v-info-i span');
      const play = infos[0];
      const playno = await page.evaluate(play => play.innerText, play);
      const danmu = infos[1];
      const danmuno = await page.evaluate(danmu => danmu.innerText, danmu);
      console.log(buttonName);
      
      await fs.appendFile(outname, `"${i+1}""${buttonName}","${playno}","${danmuno}"\n`);
  }
  await browser.close();
})();
