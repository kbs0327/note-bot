var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

var note = require('./note')

app.get('/', function (req, res) {
    res.send('Hello World!');

    console.log(req);
});

app.post('/note-slack', function (req, res) {
    res.status(200).end()
    const reqBody = req.body
    const responseUrl = reqBody.response_url
    const text = reqBody.text
    const fileName = `${reqBody.channel_id}${reqBody.user_id}`
    let response
    if (text !== 'list') {
        note.append(fileName, text)
    } else {
        response = note.list(fileName)
    }
    sendMessageToSlackResponseURL(responseUrl, {text: response ? response : `${text}가 저장되었습니다.`})
    console.log(req);
})

app.post('/note', function (req, res) {
    // res.status(200).end()
    const reqBody = req.body
    // const responseUrl = reqBody.responseUrl
    const text = reqBody.text
    const fileName = `${reqBody.channelId}${reqBody.userId}`
    let response
    if (text !== 'list') {
        note.append(fileName, text)
    } else {
        response = note.list(fileName)
    }
    res.send({
        "responseType": "ephemeral",
        text: response ? response : `${text}가 저장되었습니다.`
    })
})

function sendMessageToSlackResponseURL(responseURL, JSONmessage){
    var postOptions = {
        uri: responseURL,
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        json: JSONmessage
    }
    request(postOptions, (error, response, body) => {
        if (error){
            // handle errors as you see fit
        }
    })
}

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
