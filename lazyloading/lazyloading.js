const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const repl = require('puppeteer-extra-plugin-repl')({ addToPuppeteerClass: false })
const path = require("path");
const fs = require('fs');

process.env.TZ = 'America/New_York'
let a = new Date()
console.log(a)

puppeteer.use(StealthPlugin())

main()

async function main(){

const browser = await puppeteer.launch({
        headless: true
    });
  const page =  await browser.newPage()
  page.setDefaultNavigationTimeout(0);
  let counter = 0;
  page.on('response', async (response) => {
    const status = response.status()
      const matches = /.*\.(jpg|png|svg|gif)$/.exec(response.url());
      if (matches && (matches.length === 2)) {
        console.log(matches);
        const extension = matches[1];
        const buffer = await response.buffer();
        fs.writeFileSync(`src/image-${counter}.${extension}`, buffer, 'base64');
        counter += 1;
      }
  });

  // let url = "http://www.cboe.com/tradable_products/vix/term_structure/"
  let url = "https://knownorigin.io/marketplace?sortBy=newest"

  await page.goto(url, { waitUntil: 'load' })
  await page.setViewport({
        width: 2400,
        height: 300
    });
  await autoScroll(page);

    await page.screenshot({
        path: 'yoursite.png',
        fullPage: true
    });
  console.log('start intervallllllllllllllllllllllllllllllllllllllllllllll')
  await browser.close();
}

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 1000);
        });
    });
}