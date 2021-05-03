const date = require('date-and-time');
const fsLOG = require('fs')
const colors = require('colors')


// first slot is unique identifier
// second slot is the action to mention
// third slot is if you want to send email

const l = async (key, action, email) => {

// gets current day
const now = new Date();
const dateNow = date.format(now, 'MM-DD-YYYY')
const dateMoment= date.format(now, 'DD hh:mm');

// sets up logger
var logger = fsLOG.createWriteStream('./logs/'+dateNow+'-'+key+'.txt', {
    flags: 'a' // 'a' means appending (old data will be preserved)
  })

  date.format(now, 'hh:mm A [GMT]Z');

// writes logger and console
console.log(dateMoment.red.bold.underline +' '+ key.blue.bold +' - '+ action.yellow.bold)
logger.write(dateMoment +' '+ key +' - '+ action + '\n')


if (email == true) {

    
const send = require('gmail-send')({
    user: 'spotbot8273@gmail.com',
    pass: '719gimmq',
    to:   'spotbot8273@gmail.com',
    subject: key +' '+ action,
    text:   '',
  });
  
  send({ // Overriding default parameters
    // subject: 'attached ',         // Override value set as default
// emailsstuff
    files: [ './logs/'+dateNow+'-'+key+'.txt' ],
  }, function (err, res, full) {
    if (err) return console.log(dateMoment.red.bold.underline +' '+ key.inverse +' - '+ 'Error email not sent'.inverse);
    console.log(dateMoment.red.bold.underline+' '+ key.blue.bold +' - '+ 'Email sent'.green.bold);
  });


}



}

// test code
// l('hitheresalothere@gmail.com','logged into spotofy right now',true)

// exports for any other file
exports.l = l;

// require for other files
// const l = require('./l');
// l.l('hitheresalothere@gmail.com','logged into spotofy right now',true)