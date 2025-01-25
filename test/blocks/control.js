const { Block, BlockComponents, BlockEvents } = require("../../src")

//chest_inventory_top
module.exports = new Block("control")
    .setComponents([
        BlockComponents.Geometry({
            file: "./assets/control.geo.json",
        }),
        BlockComponents.Texture({
            "*": {
                texture: "chest_inventory_top",
                render_method: "alpha_test"
            },
        })

    ])
    .setEvents([
        BlockEvents.BlockBroken((ev) => {
            mc.world.setDynamicProperty(`control/${createId(ev.block)}`)
            database = {}
        }),
        BlockEvents.OnPlace((ev) => {
            mc.world.setDynamicProperty(`control/${createId(ev.block)}`, createId(ev.block))
        }),
    ])