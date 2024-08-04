try {
    exports.Addon = require('./src/Addon')
    exports.Block = require('./src/Block')
    exports.Item = require('./src/Item')
} catch (e) {
    console.error(`[ERRO MCBE]`, e)
}