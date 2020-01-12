// type should be module in package.json when using import.
// import http from 'http';
// express is the advanced version of http; creating server listening, controlling routes, etc..,
import express from 'express';
import { exec } from 'child_process';
import utils from 'util';
import EventEmitter from 'events';
const path = require('path');
const bodyParser = require('body-parser');

exec('hostname', (err, stdout, stderr) => {
    console.log(stdout);
});

const execP = utils.promisify(exec);

// await is used to wait for promise response and it should be used only inside async
const main = async () => {
    const { stdout } = await execP('ipconfig /displaydns');
    console.log(stdout);
};

// main().catch();

const eventEmitter = new EventEmitter();
eventEmitter.on('change', (value) => {
    console.log("something has changed through event emitter: ", value);
})
eventEmitter.emit('change', "sathish");

// creating server
const app = express();
const PORT = process.env.PORT || 3000;
const personRoute = require('./routes/person');
const customerRoute = require('./routes/customer');

app.use(bodyParser.json())
app.use((req, res, next) => {
    console.log("original url: ", req.originalUrl);
    next();
})

app.use('/person', personRoute);
app.use('/customer', customerRoute);

app.use(express.static('public'));
app.listen(PORT, () => {
    console.log(`server created on ${PORT}`);
});

app.get('/error', (req, res) => {
    // throw new Error("This is forced error|");
    res.sendFile(path.join(__dirname, "/public/500.html"));

})

app.get('/', (req, res) => {
    res.send({ message: "Hello node" });
});

app.post('/post', (req, res) => {
    res.send({ message: req.body });
    // res.send({request: req, response: res});
});

// error 404
app.use((req, res, next) => {
    res.status(404).send("you are lost");
});

// error 500 internal server error
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "public/500.html"));
});

function detectPortRequest(req, res) {
    console.log("requested", req.url);
    res.write("hello node");
    res.end();
}



// streams
// cluster/pm2
