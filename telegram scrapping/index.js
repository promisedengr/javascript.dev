const cheerio = require('cheerio');
const puppeteer = require("puppeteer")
const fs = require('fs');
const https = require('https');
const request = require('request');

async function start() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0')

  const cookies = JSON.parse(fs.readFileSync('babylonstk.evo-games.com.cookies.json', 'utf-8'));
  for (const cookie of cookies) {
    await page.setCookie(cookie);
  }
  const cookies2 = JSON.parse(fs.readFileSync('stake.com.cookies.json', 'utf-8'));
  for (const cookie of cookies2) {
    await page.setCookie(cookie);
  }

  await page.goto("https://stake.com/casino/games/evolution-roulette-lobby", {
    waitUntil: 'networkidle0'
  })

  const html = await page.content();

  const $j = await cheerio.load(html);

  const newUrl = $j('iframe').attr('src');


  console.log(newUrl);


  await page.goto(newUrl, {
    waitUntil: 'networkidle0'
  })

  // console.log(page.url())
  page.reload()


  async function getContent() {
    const hTimes = 5
    const line_3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
    const line_2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
    const line_1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];

    const col_s_1 = [1, 2, 3, 10, 11, 12, 19, 20, 21, 28, 29, 30];
    const col_s_4 = [4, 5, 6, 13, 14, 15, 22, 23, 24, 31, 32, 33];
    const col_s_9 = [7, 8, 9, 16, 17, 18, 25, 26, 27, 34, 35, 36];

    if (page.url() == 'https://babylonstk.evo-games.com/frontend/evo/r2/#category=roulette') {
     
      var html2 = await page.content();
      var $ = cheerio.load(html2);
      var list = '';
      $('article').each((i, v) => {
        var line_3_time = 0;
        var line_2_time = 0;
        var line_1_time = 0;


        var col_s_1_time = 0;
        var col_s_4_time = 0;
        var col_s_9_time = 0;

        var line_3_time_numbers = '';
        var line_2_time_numbers = '';
        var line_1_time_numbers = '';


        var col_s_1_time_numbers = '';
        var col_s_4_time_numbers = '';
        var col_s_9_time_numbers = '';

        var t = $(v).find('text').text();

        tableName = $(v).find('p[data-testid="typography"]').text();

        allNumbersArray = []
        allNumbers = ''

        rowNumbers = ''
        $(v).find('text').each((i2, v2) => {
          if (allNumbersArray.length < 8) {
            if ($(v2).attr('font-size') == 40) {
            number = $(v2).text();
            allNumbers += number + ', '
            allNumbersArray.push(parseInt(number))
            }
          }
        });
        // allNumbersArray = [16, 28, 3, 20, 11, 20, 35, 4]
        // console.log(allNumbers)
        // console.log(allNumbersArray)

        if (allNumbersArray.length) {


          allNumbersArray.forEach(element => {

            if (line_3.includes(element)) {
              line_3_time++;
              line_3_time_numbers += element + ','
            } else {
              if (line_3_time >= hTimes) {

              } else {
                line_3_time = 0;
                line_3_time_numbers = '';
              }
            }
            if (line_2.includes(element)) {
              line_2_time++;
              line_2_time_numbers += element + ','
            } else {
              if (line_2_time >= hTimes) {

              } else {
                line_2_time = 0;
                line_2_time_numbers = '';
              }
            }
            if (line_1.includes(element)) {
              line_1_time++;
              line_1_time_numbers += element + ','
            } else {
              if (line_1_time >= hTimes) {

              } else {
                line_1_time = 0;
                line_1_time_numbers = '';
              }
            }



            if (col_s_1.includes(element)) {
              col_s_1_time++;
              col_s_1_time_numbers += element + ','
            } else {
              if (col_s_1_time >= hTimes) {

              } else {
                col_s_1_time = 0;
                col_s_1_time_numbers = ''
              }
            }

            if (col_s_4.includes(element)) {
              col_s_4_time++;
              col_s_4_time_numbers += element + ','
            } else {
              if (col_s_4_time >= hTimes) {

              } else {
                col_s_4_time = 0;
                col_s_4_time_numbers += element + ','
              }
            }


            if (col_s_9.includes(element)) {
              col_s_9_time++;
              col_s_9_time_numbers += element + ','
            } else {
              if (col_s_9_time >= hTimes) {

              } else {
                col_s_9_time = 0;
                col_s_9_time_numbers = ''
              }
            }

          });

          console.log(line_1_time)
          console.log(line_2_time)
          console.log(line_3_time)

          numbers = [
            line_1_time,
            line_2_time,
            line_3_time,
            col_s_1_time,
            col_s_4_time,
            col_s_9_time,
          ]
          const index = numbers.indexOf(Math.max(...numbers))
          if (
            (line_1_time >= hTimes || line_2_time >= hTimes || line_3_time >= hTimes) ||
            (col_s_1_time >= hTimes || col_s_4_time >= hTimes || col_s_9_time >= hTimes)
          ) {
            if(tableName != 'Double Ball Roulette'){

              code = ''

              if(index == 0){ numbers = line_1_time_numbers; code = 'COL 1'}
              if(index == 1){ numbers = line_2_time_numbers; code = 'COL 2'}
              if(index == 2){ numbers = line_3_time_numbers; code = 'COL 3'}
              if(index == 3){ numbers = col_s_1_time_numbers; code = 'S1'}
              if(index == 4){ numbers = col_s_4_time_numbers; code = 'S4'}
              if(index == 5){ numbers = col_s_9_time_numbers; code = 'S9'}
                
              fulltext = '[' + tableName + '] - ' + allNumbers + " [" + numbers.slice(0,-1) + "] - [" + code + "]"+ "\n";
              list += fulltext
            }
            
          }
        }
 
    
      });
      if (list) {
        console.log(list)
        var options = {
          'method': 'POST',
          'url': 'https://discord.com/api/webhooks/989462556643065876/Qm3nmvq5XN7fXlqQm4e6fdDR-7Ehw7X01rCtQJ8WSMY9dgkroE3-gM_mHeh1XS3rrrFK',
          // 'url': 'https://discord.com/api/webhooks/989461683388956692/2zJa9JUKAvRUYbyH9ZuzlJtcTMlsow40tHRfKfCHsnsvF1uOHtRrytXwZFn8kVvvPJOH',
          'headers': {
            'Content-Type': 'application/json',
            'Cookie': '__cfruid=ee1d5180f2f3831393771a70d2685a92f9132298-1655976488; __dcfduid=de5af996f2d211eca573b2c1ffee448d; __sdcfduid=de5af996f2d211eca573b2c1ffee448dc1d8b9b29e9bae8b7e28c3dbb86ed23b3d0cd00fe2443ba1024c33796db74d34'
          },
          body: JSON.stringify({
            "content": list
          })

        };
        request(options, function (error, response) {
          if (error) throw new Error(error);
          console.log(response.body);
        });
      } else {
        var m = new Date();
        var dateString =
          m.getUTCFullYear() + "/" +
          ("0" + (m.getUTCMonth() + 1)).slice(-2) + "/" +
          ("0" + m.getUTCDate()).slice(-2) + " " +
          ("0" + m.getUTCHours()).slice(-2) + ":" +
          ("0" + m.getUTCMinutes()).slice(-2) + ":" +
          ("0" + m.getUTCSeconds()).slice(-2);

        console.log(dateString + ' no matches...' + '*' + hTimes)
      }
      page.reload()
    }
  }
  setInterval(getContent, 15 * 1000);



}

start()