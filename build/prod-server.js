var path = require('path')
var express = require('express')
var app = express()

// serve pure static assets
app.use(express.static(path.join(__dirname , '../dist')));

app.listen(80)
console.log('listen 80')
