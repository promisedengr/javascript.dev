const express = require('express');
const app = express();
const ytdl = require('ytdl-core');
const fs = require('fs')
app.use(express.static('public'))
app.listen(4002, async()=> {
console.log('listening at 4002')
// startDownload_test_1()
startDownload_test_2()

})

async function startDownload_test_1() {
    console.log('start download')
    const writeableStream = fs.createWriteStream(`${234}.mp4`);
    const a = new File()
    
    // Listening for the 'finish' event
    writeableStream.on('finish', () => {
        console.log(`${22}/${22} - ${22} downloaded successfully`);
    });
    let videoUrl = 'http://www.youtube.com/watch?v=aqz-KE-bpKQ'
    // Plug it into the ReadableStream
    ytdl(videoUrl, {
        format: "mp4",
    }).pipe(writeableStream);
}

async function startDownload_test_2() {
    console.log('start download')
    await ytdl('http://www.youtube.com/watch?v=aqz-KE-bpKQ')
    .pipe(fs.createWriteStream('video2.mp4'));
}

app.post('/yt_download', (req, res) => {
    let url = req.url
    console.log(url)


})