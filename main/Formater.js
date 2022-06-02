const fs = require('node:fs')
//
module.exports = function (data) {
 try {
  if (data.code == undefined) return console.error(`[BUG MCBE] `, `Need Code\n> For formater`)
  else {
   return JSON.stringify(data.code, null, 2)
  }
 }
catch (e) {
 console.error(`[ERRO MCBE] ` + e)
}
}