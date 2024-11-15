try {
    exports.Addon = require('./src/Addon')
    exports.Block = require('./src/Block')
    exports.Item = require('./src/Item')
    exports.BlockCustomComponents = require("./utils").BlockCustomComponents
    exports.ItemCustomComponents = require("./utils").ItemCustomComponents
} catch (e) {
    console.error(`[ERRO MCBE]`, e)
}