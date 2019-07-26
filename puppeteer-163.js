const puppeteer = require('puppeteer');
const fs = require('fs-extra');

(async () => {
  const browser = await puppeteer.launch({ headless: false});
  const page = await browser.newPage();
  const outname = 'out-2.cvs';
  //打开网页保存成图片
  //await page.goto('https://www.163.com');
  //await page.screenshot({path: '163-new.png'});
  // await page.goto('https://www.163.com/');
  // await page.waitForSelector('.news_yw_show .cm_ul_round');
  // const sections = await page.$$('.news_yw_show .cm_ul_round li');
  // console.log(sections.length);

  await fs.writeFile(outname, 'title,name\n');

  for(let i = 0; i<19; i++){
  	  await page.goto('https://www.163.com/');
      await page.waitForSelector('.news_yw_show .cm_ul_round');
      const sections = await page.$$('.news_yw_show .cm_ul_round li');

	  const section = sections[i];
      const button = await section.$('a');
      const buttonName = await page.evaluate(button => button.innerText, button);
      console.log(buttonName);
      const buttonLink = await page.evaluate(button => button.getAttribute('href'), button);
      console.log(buttonLink);
      //button.click();
      
      await page.goto(buttonLink);
      console.log('open new page. 000000000000000');
      await page.waitForSelector('.post_cnum_tie');
      console.log('.post_cnum_tie ok. 111111111111111111');
      const gentie = await page.$$('.post_cnum_tie');
      const gentie_no = await page.evaluate(gentie => gentie.innerText, gentie);
      cosnole.log(gentie_no);
      await fs.appendFile('out.cvs', `"${buttonName}","${gentie_no}"\n`);
      //await fs.appendFile(outname, `"${buttonName}","${buttonLink}"\n`);
  }
  await browser.close();
})();
