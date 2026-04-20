const fs = require('fs');
const https = require('https');

fetch('https://www.google.com/maps/place/Rahul+Appartment/@14.6634675,74.3061848,112m/data=!3m1!1e3!4m6!3m5!1s0x3bbe874b1b2f885d:0x94f17d5265226317!8m2!3d14.6634801!4d74.3064051', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
})
.then(r => r.text())
.then(text => {
  const match = text.match(/<meta content="([^"]+)" itemprop="image"/);
  if (!match) {
    const ogMatch = text.match(/<meta property="og:image" content="([^"]+)"/);
    if (!ogMatch) {
       console.log('No image found');
       return;
    }
    downloadImage(ogMatch[1]);
  } else {
    downloadImage(match[1]);
  }
});

function downloadImage(url) {
  console.log("Found URL:", url);
  https.get(url, (res) => {
    const file = fs.createWriteStream('./public/google_maps_outside.jpg');
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('Image Downloaded Successfully');
    });
  });
}
