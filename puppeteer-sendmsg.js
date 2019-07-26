const puppeteer = require('puppeteer');
(async () => {
	const browser = await puppeteer.launch({
		timeout: 0,
		//将默认无头模式  ---->  有头模式
		headless: false,
		// 每次type输入字母/间隔100m 
		slowMo: 100
	});
	const page = await browser.newPage();
	//字面意思，你要chrome打开的网页
	await page.goto('http://www.ibm.com');
	// debug tools
	await page.evaluate(() => {
		//页面入侵，可在打开的前台页面console 界面键入代码，更改dom信息，。。。
		window.addEventListener('mousemove', e => {
			try {
				//添加点击动画，留下点击痕迹，便于测试
				const div = document.createElement('div');
				div.style.width = '5px';
				div.style.height = '5px';
				div.style.borderRadius = '50%';
				div.style.backgroundColor = 'red';
				div.style.position = 'absolute';
				div.style.left = e.x + 5 + 'px';
				div.style.top = e.y + 5 + 'px';
				div.style.zIndex = "99999";
				document.body.appendChild(div);
			} catch (err) {
				console.error(err);
			}
		});
	});
	let login = await page.$('input.search-keyword')
	await login.type(phone)
	let button = await page.$('.login-reg-right')
	await button.click()
	await page.deleteCookie();
	await browser.close();
})();