const puppeteer = require('puppeteer-core');
const chromePaths = require('chrome-paths');
const { createCursor } = require('ghost-cursor')
const randomInt = require('random-int')
// const Xvfb = require('xvfb');


randomTyping = async (page, wordsToType, selector) => {

  function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });}

    let arr = Array.from(wordsToType)
    console.log(arr)

    for (var i = 0; i < arr.length; i++) {
      await delay(randomInt(200,500))
      page.type(selector,arr[i])
      //console.log(arr[i])
    }

  }


(async () => {

//     // xvfb install
//     var xvfb = new Xvfb({
//         silent: true,
//         xvfb_args: ["-screen", "0", '1280x720x24', "-ac"],
//     });
//     xvfb.start((err)=>{if (err) console.error(err)})

  const browser = await puppeteer.launch({
      args: [
        '--no-sandbox'],
   //     '--window-size='+1080+','+720],
        // '--display='+xvfb._display],
      executablePath: chromePaths.chrome,
      headless: false,
  });

  const page = await browser.newPage();

  const cursor = createCursor(page)
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    };
  });

  // document.querySelector('#crc_detect').textContent

  await page.goto('https://browserleaks.com/canvas')
//   const webgl = await page.$$('a.a-link-normal.a-text-normal')
let followersCount = await page.evaluate(() => {
    return document.querySelector('#crc_detect').textContent
});
let crc = await page.evaluate(() => {
    return document.querySelector('#crc').textContent
});


console.log(followersCount)
console.log(crc)
//  console.log('Dimensions:', dimensions);

  const html = await page.content();

  


})();