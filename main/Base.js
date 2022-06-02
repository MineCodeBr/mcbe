const fs = require('node:fs')
const messages = require('../messages.json')
//
module.exports = function (data) {
 try {
  if (data.description == undefined) return console.error(`${messages['description']}`)
  if (data.name == undefined) return console.error(`${messages['name']}`)
  else {}
 }
catch (e) {
 console.error(`[BUG MCBE] ` + e)
}
}