const { Item } = require("../../../dist/index")


module.exports = (
    new Item("mc:item_legal")
        .setTags("tag1", "tag2")
        .setItemTexture("stone", "textures/items/stone", "./assets/grass.png")
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