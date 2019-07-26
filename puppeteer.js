const puppeteer = require('puppeteer');
const fs = require('fs-extra');

(async () => {
  const browser = await puppeteer.launch({ headless: false});
  const page = await browser.newPage();
  page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36');
  const outname = 'out-2.cvs';
  //打开网页保存成图片
  //await page.goto('https://www.163.com');
  //await page.screenshot({path: '163-new.png'});
  await page.goto('https://www.ibm.com/us-en/');
  await page.waitForSelector('#ibm-featured-cards .ibm-card__content');
  const sections = await page.$$('.ibm-grid-col-sm-4-4');
  console.log(sections.length);

  await fs.writeFile(outname, 'title,name\n');

  for(let i = 0; i<sections.length; i++){
  	  await page.goto('https://www.ibm.com/us-en/');
      await page.waitForSelector('#ibm-featured-cards .ibm-card__content');
      const sections = await page.$$('#ibm-featured-cards .ibm-grid-col-sm-4-4');

	    const section = sections[i];
      const button = await section.$('.ibm-card__content p');
      const buttonName = await page.evaluate(button => button.innerText, button);
      console.log(buttonName);

      section.click();
      
      await page.waitForSelector('h1');
      console.log('h1 ok. ' + i);
      const gentie = await page.$$('h1 span');
      const gentie_no = await page.evaluate(gentie => gentie.innerText, gentie);
      console.log(gentie_no);
      await fs.appendFile(outname, `"${buttonName}","${gentie_no}"\n`);
      //await fs.appendFile(outname, `"${buttonName}","${buttonLink}"\n`);
  }
  await browser.close();
})();
