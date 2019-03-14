const fs = require('fs');
const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');

const readline = require('readline');

const app = express();
const { port } = require('./config.js');

const tools = require('./views/js/script.js');

app.use(express.static('public'));
app.set('view engine', 'pug');

let json = JSON.parse(fs.readFileSync('./views/data.json'));
let html = pug.renderFile('./views/file.pug', { ...json });

const defaultFormJson = JSON.parse(fs.readFileSync('./views/data_form.json'));
let formJson = { ...defaultFormJson };
let htmlForm = pug.renderFile('./views/form.pug', { ...formJson });

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true,
}));

require('./routes')(pug, app, json, html, defaultFormJson, formJson, htmlForm);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Please enter N : ', (n) => {
  rl.question('Please enter M: ', (m) => {
    let result = tools.getSum(n, m);
    console.log(`The sum of M last digits: ${result}`);
    result = tools.getCommonMultiples(n, m);
    console.log(`The common multiples less N*M: ${result}`);
    result = tools.getMercenne(n);
    console.log(`The Mercenne's numbers less N are: ${result}`);
    rl.close();
  });
});
