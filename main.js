const puppeteer = require('puppeteer-extra');
const chromePaths = require('chrome-paths');
const { createCursor } = require('ghost-cursor')
const randomInt = require('random-int')
const date = require('date-and-time');

require('dotenv').config()

const randomPagesToScrape = [ 'https://www.goat.com/sneakers/ambush-x-dunk-high-lethal-pink-cu7544-600', 'https://www.goat.com/sneakers/dunk-low-hyper-cobalt-dd1391-001', 'https://www.goat.com/sneakers/air-jordan-13-retro-lucky-green-db6537-113', 'https://www.goat.com/sneakers/dunk-high-retro-michigan-2020-cz8149-700', 'https://www.goat.com/sneakers/dunk-high-sp-pro-green-cz8149-100', 'https://www.goat.com/sneakers/air-jordan-1-high-zoom-space-hippe-cw2414-001', 'https://www.goat.com/sneakers/air-jordan-14-retro-hyper-royal-487471-104', 'https://www.goat.com/sneakers/air-jordan-5-retro-se-oregon-ducks-ck6631-307', 'https://www.goat.com/sneakers/air-jordan-7-greater-china-special-box-cw2805-160', 'https://www.goat.com/sneakers/air-jordan-1-retro-high-og-baroque-brown-555088-201', 'https://www.goat.com/sneakers/paris-saint-germain-x-air-jordan-4-retro-neutral-grey-cz5624-100', 'https://www.goat.com/sneakers/dunk-low-sp-retro-ugly-duckling-pack-ceramic-2020-da1469-001', 'https://www.goat.com/sneakers/pharrell-x-nmd-human-race-extra-eye-g58412', 'https://www.goat.com/sneakers/air-jordan-12-retro-reverse-flu-game-ct8013-602', 'https://www.goat.com/sneakers/air-jordan-13-retro-starfish-414571-108', 'https://www.goat.com/sneakers/air-jordan-2-just-don-717170-405', 'https://www.goat.com/sneakers/don-c-x-air-jordan-2-retro-just-don-834825-250', 'https://www.goat.com/sneakers/air-jordan-2-retro-385475-102', 'https://www.goat.com/sneakers/air-jordan-2-retro-melo-385475-122', 'https://www.goat.com/sneakers/air-jordan-2-retro-black-history-month-bq7618-007', 'https://www.goat.com/sneakers/air-jordan-1-retro-high-og-555088-105', 'https://www.goat.com/sneakers/air-jordan-12-retro-dark-concord-ct8013-005', 'https://www.goat.com/sneakers/air-jordan-3-retro-court-purple-ct8532-050', 'https://www.goat.com/sneakers/dunk-low-sp-retro-ugly-duckling-pack-ceramic-2020-da1469-001', 'https://www.goat.com/sneakers/union-la-x-air-jordan-4-retro-dc9533-001', 'https://www.goat.com/sneakers/union-la-x-air-jordan-4-retro-guava-ice-dc9533-800', 'https://www.goat.com/sneakers/air-jordan-1-high-zoom-rage-green-ck6637-002', 'https://www.goat.com/sneakers/air-jordan-6-retro-quai-54-purple-cz4152-101', 'https://www.goat.com/sneakers/wmns-air-jordan-1-retro-high-og-satin-snake-cd0461-601', 'https://www.goat.com/sneakers/air-jordan-1-retro-high-og-neutral-grey-dc1788-029', 'https://www.goat.com/sneakers/off-white-x-air-force-1-volt-ao4606-700', 'https://www.goat.com/sneakers/yeezy-slides-earth-brown-fv8425','https://www.goat.com/sneakers/ambush-x-dunk-high-lethal-pink-cu7544-600', 'https://www.goat.com/sneakers/dunk-low-hyper-cobalt-dd1391-001', 'https://www.goat.com/sneakers/air-jordan-13-retro-lucky-green-db6537-113', 'https://www.goat.com/sneakers/dunk-high-retro-michigan-2020-cz8149-700', 'https://www.goat.com/sneakers/dunk-high-sp-pro-green-cz8149-100', 'https://www.goat.com/sneakers/air-jordan-1-high-zoom-space-hippe-cw2414-001', 'https://www.goat.com/sneakers/air-jordan-14-retro-hyper-royal-487471-104', 'https://www.goat.com/sneakers/air-jordan-5-retro-se-oregon-ducks-ck6631-307', 'https://www.goat.com/sneakers/air-jordan-7-greater-china-special-box-cw2805-160', 'https://www.goat.com/sneakers/air-jordan-1-retro-high-og-baroque-brown-555088-201', 'https://www.goat.com/sneakers/paris-saint-germain-x-air-jordan-4-retro-neutral-grey-cz5624-100', 'https://www.goat.com/sneakers/dunk-low-sp-retro-ugly-duckling-pack-ceramic-2020-da1469-001', 'https://www.goat.com/sneakers/pharrell-x-nmd-human-race-extra-eye-g58412', 'https://www.goat.com/sneakers/air-jordan-12-retro-reverse-flu-game-ct8013-602', 'https://www.goat.com/sneakers/air-jordan-13-retro-starfish-414571-108', 'https://www.goat.com/sneakers/air-jordan-2-just-don-717170-405', 'https://www.goat.com/sneakers/don-c-x-air-jordan-2-retro-just-don-834825-250', 'https://www.goat.com/sneakers/air-jordan-2-retro-385475-102', 'https://www.goat.com/sneakers/air-jordan-2-retro-melo-385475-122', 'https://www.goat.com/sneakers/air-jordan-2-retro-black-history-month-bq7618-007', 'https://www.goat.com/sneakers/air-jordan-1-retro-high-og-555088-105', 'https://www.goat.com/sneakers/air-jordan-12-retro-dark-concord-ct8013-005', 'https://www.goat.com/sneakers/air-jordan-3-retro-court-purple-ct8532-050', 'https://www.goat.com/sneakers/dunk-low-sp-retro-ugly-duckling-pack-ceramic-2020-da1469-001', 'https://www.goat.com/sneakers/union-la-x-air-jordan-4-retro-dc9533-001', 'https://www.goat.com/sneakers/union-la-x-air-jordan-4-retro-guava-ice-dc9533-800', 'https://www.goat.com/sneakers/air-jordan-1-high-zoom-rage-green-ck6637-002', 'https://www.goat.com/sneakers/air-jordan-6-retro-quai-54-purple-cz4152-101', 'https://www.goat.com/sneakers/wmns-air-jordan-1-retro-high-og-satin-snake-cd0461-601', 'https://www.goat.com/sneakers/air-jordan-1-retro-high-og-neutral-grey-dc1788-029', 'https://www.goat.com/sneakers/off-white-x-air-force-1-volt-ao4606-700', 'https://www.goat.com/sneakers/yeezy-slides-earth-brown-fv8425','https://www.goat.com/sneakers/ambush-x-dunk-high-lethal-pink-cu7544-600', 'https://www.goat.com/sneakers/dunk-low-hyper-cobalt-dd1391-001', 'https://www.goat.com/sneakers/air-jordan-13-retro-lucky-green-db6537-113', 'https://www.goat.com/sneakers/dunk-high-retro-michigan-2020-cz8149-700', 'https://www.goat.com/sneakers/dunk-high-sp-pro-green-cz8149-100', 'https://www.goat.com/sneakers/air-jordan-1-high-zoom-space-hippe-cw2414-001', 'https://www.goat.com/sneakers/air-jordan-14-retro-hyper-royal-487471-104', 'https://www.goat.com/sneakers/air-jordan-5-retro-se-oregon-ducks-ck6631-307', 'https://www.goat.com/sneakers/air-jordan-7-greater-china-special-box-cw2805-160', 'https://www.goat.com/sneakers/air-jordan-1-retro-high-og-baroque-brown-555088-201', 'https://www.goat.com/sneakers/paris-saint-germain-x-air-jordan-4-retro-neutral-grey-cz5624-100', 'https://www.goat.com/sneakers/dunk-low-sp-retro-ugly-duckling-pack-ceramic-2020-da1469-001', 'https://www.goat.com/sneakers/pharrell-x-nmd-human-race-extra-eye-g58412', 'https://www.goat.com/sneakers/air-jordan-12-retro-reverse-flu-game-ct8013-602', 'https://www.goat.com/sneakers/air-jordan-13-retro-starfish-414571-108', 'https://www.goat.com/sneakers/air-jordan-2-just-don-717170-405', 'https://www.goat.com/sneakers/don-c-x-air-jordan-2-retro-just-don-834825-250', 'https://www.goat.com/sneakers/air-jordan-2-retro-385475-102', 'https://www.goat.com/sneakers/air-jordan-2-retro-melo-385475-122', 'https://www.goat.com/sneakers/air-jordan-2-retro-black-history-month-bq7618-007', 'https://www.goat.com/sneakers/air-jordan-1-retro-high-og-555088-105', 'https://www.goat.com/sneakers/air-jordan-12-retro-dark-concord-ct8013-005', 'https://www.goat.com/sneakers/air-jordan-3-retro-court-purple-ct8532-050', 'https://www.goat.com/sneakers/dunk-low-sp-retro-ugly-duckling-pack-ceramic-2020-da1469-001', 'https://www.goat.com/sneakers/union-la-x-air-jordan-4-retro-dc9533-001', 'https://www.goat.com/sneakers/union-la-x-air-jordan-4-retro-guava-ice-dc9533-800', 'https://www.goat.com/sneakers/air-jordan-1-high-zoom-rage-green-ck6637-002', 'https://www.goat.com/sneakers/air-jordan-6-retro-quai-54-purple-cz4152-101', 'https://www.goat.com/sneakers/wmns-air-jordan-1-retro-high-og-satin-snake-cd0461-601', 'https://www.goat.com/sneakers/air-jordan-1-retro-high-og-neutral-grey-dc1788-029', 'https://www.goat.com/sneakers/off-white-x-air-force-1-volt-ao4606-700', 'https://www.goat.com/sneakers/yeezy-slides-earth-brown-fv8425','https://www.goat.com/sneakers/ambush-x-dunk-high-lethal-pink-cu7544-600', 'https://www.goat.com/sneakers/dunk-low-hyper-cobalt-dd1391-001', 'https://www.goat.com/sneakers/air-jordan-13-retro-lucky-green-db6537-113', 'https://www.goat.com/sneakers/dunk-high-retro-michigan-2020-cz8149-700', 'https://www.goat.com/sneakers/dunk-high-sp-pro-green-cz8149-100', 'https://www.goat.com/sneakers/air-jordan-1-high-zoom-space-hippe-cw2414-001', 'https://www.goat.com/sneakers/air-jordan-14-retro-hyper-royal-487471-104', 'https://www.goat.com/sneakers/air-jordan-5-retro-se-oregon-ducks-ck6631-307', 'https://www.goat.com/sneakers/air-jordan-7-greater-china-special-box-cw2805-160', 'https://www.goat.com/sneakers/air-jordan-1-retro-high-og-baroque-brown-555088-201', 'https://www.goat.com/sneakers/paris-saint-germain-x-air-jordan-4-retro-neutral-grey-cz5624-100', 'https://www.goat.com/sneakers/dunk-low-sp-retro-ugly-duckling-pack-ceramic-2020-da1469-001', 'https://www.goat.com/sneakers/pharrell-x-nmd-human-race-extra-eye-g58412', 'https://www.goat.com/sneakers/air-jordan-12-retro-reverse-flu-game-ct8013-602', 'https://www.goat.com/sneakers/air-jordan-13-retro-starfish-414571-108', 'https://www.goat.com/sneakers/air-jordan-2-just-don-717170-405', 'https://www.goat.com/sneakers/don-c-x-air-jordan-2-retro-just-don-834825-250', 'https://www.goat.com/sneakers/air-jordan-2-retro-385475-102', 'https://www.goat.com/sneakers/air-jordan-2-retro-melo-385475-122', 'https://www.goat.com/sneakers/air-jordan-2-retro-black-history-month-bq7618-007', 'https://www.goat.com/sneakers/air-jordan-1-retro-high-og-555088-105', 'https://www.goat.com/sneakers/air-jordan-12-retro-dark-concord-ct8013-005', 'https://www.goat.com/sneakers/air-jordan-3-retro-court-purple-ct8532-050', 'https://www.goat.com/sneakers/dunk-low-sp-retro-ugly-duckling-pack-ceramic-2020-da1469-001', 'https://www.goat.com/sneakers/union-la-x-air-jordan-4-retro-dc9533-001', 'https://www.goat.com/sneakers/union-la-x-air-jordan-4-retro-guava-ice-dc9533-800', 'https://www.goat.com/sneakers/air-jordan-1-high-zoom-rage-green-ck6637-002', 'https://www.goat.com/sneakers/air-jordan-6-retro-quai-54-purple-cz4152-101', 'https://www.goat.com/sneakers/wmns-air-jordan-1-retro-high-og-satin-snake-cd0461-601', 'https://www.goat.com/sneakers/air-jordan-1-retro-high-og-neutral-grey-dc1788-029', 'https://www.goat.com/sneakers/off-white-x-air-force-1-volt-ao4606-700', 'https://www.goat.com/sneakers/yeezy-slides-earth-brown-fv8425']

// const Xvfb = require('xvfb');

console.log(process.env.PROXY_IP)


function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}


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


let portSelection = randomInt(Number(process.env.US_PROXY_PORT_START),Number(process.env.US_PROXY_PORT_END))
console.log(portSelection,'port selection')

;(async () => {

  await delay(randomInt(1000,10000))

//     // xvfb install
//     var xvfb = new Xvfb({
//         silent: true,
//         xvfb_args: ["-screen", "0", '1280x720x24', "-ac"],
//     });
//     xvfb.start((err)=>{if (err) console.error(err)})

  const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--window-size=1920,1080',
        `--proxy-server=${process.env.PROXY_IP+':'+portSelection}`,],
   //     '--window-size='+1080+','+720],
        // '--display='+xvfb._display],
      executablePath: chromePaths.chrome,
      headless: false,
      defaultViewport: null
  });

  let waitTime = null

  // goes through pages to scrape every 5 minutes
  const page = await browser.newPage();
  await page.goto('https://www.bing.com/')
  try {
  for (i = 0; i < randomPagesToScrape.length; i++) {
    await page.goto(randomPagesToScrape[i], {timeout: 90000})
    let textContents = await page.$('[data-qa="product_display_name_text"]', {timeout: 90000})
    console.log(textContents)
    waitTime = randomInt(15000,30000)
    console.log(waitTime,'is total wait time for',i,'item')
    await delay(waitTime)
    // if (i == 30) {i = }
  }
} catch (err) {
  console.log(err,'->',i,'->',date.format(new Date(), 'YYYY/MM/DD HH:mm:ss'))
}


//   const cursor = createCursor(page)
//   const dimensions = await page.evaluate(() => {
//     return {
//       width: document.documentElement.clientWidth,
//       height: document.documentElement.clientHeight,
//       deviceScaleFactor: window.devicePixelRatio,
//     };
//   });

//   // document.querySelector('#crc_detect').textContent

//   await page.goto('https://browserleaks.com/canvas')
// //   const webgl = await page.$$('a.a-link-normal.a-text-normal')
// let followersCount = await page.evaluate(() => {
//     return document.querySelector('#crc_detect').textContent
// });
// let crc = await page.evaluate(() => {
//     return document.querySelector('#crc').textContent
// });


// console.log(followersCount)
// console.log(crc)
// //  console.log('Dimensions:', dimensions);

//   const html = await page.content();

  


})();