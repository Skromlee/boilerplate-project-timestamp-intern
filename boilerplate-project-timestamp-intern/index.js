// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

// api without data
app.get("/api", (req, res) => {
  let date = new Date()
  let unix = date.getTime()
  let utc = date.toUTCString()
  res.status(200).json({
    unix: unix,
    utc: utc
  })
})


// api with data
app.get("/api/:data", (req, res) => {
  let { data } = req.params

  // create date Object from input data
  let date = new Date(data)

  if (date == "Invalid Date") {
    date = new Date(parseInt(data))
  }

  if (date == "Invalid Date") {
    res.status(400).json({
      error: "Invalid Date"
    })
  } else {
    // turn date into unix
    let unix = date.getTime()
    // turn date into utc
    let utc = date.toUTCString()

    // send json
    res.status(200).json({
      unix: unix,
      utc: utc
    })
  }
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
