const { Item } = require("../../../dist/index")


module.exports = (
    new Item("mc:item_legal_demais")
        .setTags("tag1", "tag2")
        .setCustomComponent("mc:test", {
            onUseOn(t) {
                t.source.runCommand('say sla')
            }
        }
        )
        .setComponent("minecraft:icon", {
            texture: "stone"
        })
        .setComponent("minecraft:display_name", {
            value: "Testee"
        })
        .setComponent("minecraft:creative_category", {
            parent: "items"
        })
)