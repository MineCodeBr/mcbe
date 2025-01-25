//const { ActionFormData } = require("@minecraft/server-ui")
const { Block, BlockComponents, BlockEvents } = require("../../src")
//const mc = require("@minecraft/server")

module.exports = new Block("terminal")
    .setTexturePath("terminal", "./assets/terminal_block.png")
    .setTraits({
        "minecraft:placement_direction": {
            "enabled_states": ["minecraft:cardinal_direction"],
            "y_rotation_offset": 180
        }
    })
    .setPermutations([
        // Facing north
        {
            "condition": "q.block_state('minecraft:cardinal_direction') == 'north'",
            "components": {
                "minecraft:transformation": { "rotation": [0, 0, 0] }
            }
        },
        // Facing west
        {
            "condition": "q.block_state('minecraft:cardinal_direction') == 'west'",
            "components": {
                "minecraft:transformation": { "rotation": [0, 90, 0] }
            }
        },
        // Facing south
        {
            "condition": "q.block_state('minecraft:cardinal_direction') == 'south'",
            "components": {
                "minecraft:transformation": { "rotation": [0, 180, 0] }
            }
        },
        // Facing east
        {
            "condition": "q.block_state('minecraft:cardinal_direction') == 'east'",
            "components": {
                "minecraft:transformation": { "rotation": [0, -90, 0] }
            }
        }
    ])
    .setCategory("Items")
    .setComponents([
        BlockComponents.CollisionBox({
            x: -5,
            y: 3,
            z: 6,
        }, {
            x: 10,
            y: 10,
            z: 2,
        }),
        BlockComponents.SelectionBox({
            x: -5,
            y: 3,
            z: 6,
        }, {
            x: 10,
            y: 10,
            z: 2,
        }),
        BlockComponents.Geometry({
            file: "./assets/terminal.geo.json",
        }),
        BlockComponents.Texture({
            "*": {
                texture: "terminal",
                render_method: "alpha_test"
            },
            "iron_block": {
                texture: "iron_block",
                render_method: "alpha_test"
            },
        })
    ])
    .setEvents([
        BlockEvents.OnPlace((ev) => {
            console.warn("Place")
            ev.block.dimension.runCommandAsync(`summon mc:terminal tile.mc:terminal.name ${ev.block.location.x} ${ev.block.location.y} ${ev.block.location.z}`)
            console.warn("Placed")
        }),
        BlockEvents.BlockBroken((ev) => {

            ev.block.dimension.getEntitiesAtBlockLocation(ev.block.location)[0]?.remove()
        }),
        BlockEvents.OnClick((ev) => {

            const form = new mcui.ActionFormData().title("ola")
            for (const chest of database[database[createId(ev.block)]].chests) {
                const inv = ev.block.dimension.getBlock({ x: Number(chest.split("/")[0]), y: Number(chest.split("/")[1]), z: Number(chest.split("/")[2]) })?.getComponent("minecraft:inventory").container
                for (var slot = 0; slot < inv.size; slot++) {
                    const item = inv.getItem(slot)
                    if (!item) continue
                    form.button(item.typeId)
                }
            }

            form.show(ev.player)

        }),
        BlockEvents.OnTick(
            { interval_range: [4, 4], looping: true },
            (ev) => {
                const atualEntiyInv = ev.block.dimension.getEntitiesAtBlockLocation(ev.block.location)[0]?.getComponent("minecraft:inventory")?.container

                const cables = [
                    "mc:simple_cable",
                    "mc:link_cable",
                ]
                for (const face of getAllFaces(ev.block)) {
                    if (!database[createId(ev.block)]) {
                        if (face.getItemStack()?.typeId === "mc:control") {
                            if (mc.world.getDynamicProperty(`control/${createId(face)}`)) {
                                database[createId(ev.block)] = mc.world.getDynamicProperty(`control/${createId(face)}`)
                            }
                        } else if (cables.includes(face.getItemStack()?.typeId)) {
                            if (database[createId(face)]) {
                                database[createId(ev.block)] = database[createId(face)]
                            }
                        }
                    }
                }

                if (!database[database[createId(ev?.block)]]?.chests) return
                for (const chest of database[database[createId(ev.block)]].chests) {
                    const inv = ev.block.dimension.getBlock({ x: Number(chest.split("/")[0]), y: Number(chest.split("/")[1]), z: Number(chest.split("/")[2]) })?.getComponent("minecraft:inventory").container
                    for (var slot = 0; slot < inv.size; slot++) {
                        const item = inv.getItem(slot)
                        if (!item) continue
                        atualEntiyInv?.setItem(slot, item)
                    }
                }

            })
    ])