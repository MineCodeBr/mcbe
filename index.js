'use strict';
try {
exports.Manifest = require('./main/Manifest')
exports.ItemAutomatic = require('./main/ItemAuto')
exports.TemplateAddon = require('./main/TemplateAddon')
exports.Formater = require('./main/Formater')
} catch (e) {
 console.error(`[ERRO MCBE] ` + e)
}