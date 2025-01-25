const { Block, BlockComponents, BlockEvents } = require("../../src")
//const mc = require("@minecraft/server")

module.exports = new Block("link_cable")
    .setStates("mc:n", [false, true])
    .setStates("mc:s", [false, true])
    .setStates("mc:w", [false, true])
    .setStates("mc:e", [false, true])
    .setStates("mc:u", [false, true])
    .setStates("mc:d", [false, true])
    .setStates("mc:n_con", [false, true])
    .setStates("mc:s_con", [false, true])
    .setStates("mc:w_con", [false, true])
    .setStates("mc:e_con", [false, true])
    .setStates("mc:u_con", [false, true])
    .setStates("mc:d_con", [false, true])
    .setCategory("Items")
    .setTexturePath("base_purple", "./assets/base_purple.png")
    .setTexturePath("cable_template", "./assets/cable_template.png")
    .setComponents([
        BlockComponents.CollisionBox({
            x: -4,
            y: 4,
            z: -4,
        }, {
            x: 8,
            y: 8,
            z: 8,
        }),
        BlockComponents.SelectionBox({
            x: -4,
            y: 4,
            z: -4,
        }, {
            x: 8,
            y: 8,
            z: 8,
        }),
        BlockComponents.Geometry({
            file: "./assets/link.cable.geo.json",
            identifier: "sla.model",
            bone_visibility: {
                n: "q.block_state('mc:n') ==true",
                s: "q.block_state('mc:s') ==true",
                w: "q.block_state('mc:w')==true",
                e: "q.block_state('mc:e') == true",
                u: "q.block_state('mc:u') == true",
                d: "q.block_state('mc:d') == true",
                n_con: "q.block_state('mc:n_con') == true",
                s_con: "q.block_state('mc:s_con') == true",
                w_con: "q.block_state('mc:w_con') == true",
                e_con: "q.block_state('mc:e_con') == true",
                u_con: "q.block_state('mc:u_con') == true",
                d_con: "q.block_state('mc:d_con') == true",
            }
        }),
        BlockComponents.Texture({
            "*": {
                texture: "iron_block",
                render_method: "blend"
            },
            "cable": {
                texture: "cable_template",
                render_method: "alpha_test"
            },
            "glass": {
                texture: "purple_stained_glass",
                render_method: "blend"
            },
        })
    ])
    .setEvents([
        BlockEvents.OnClick((ev) => {
            console.warn("ola")
        }),
        BlockEvents.BlockBroken((ev) => {
            database = {}
        }),
        BlockEvents.OnPlace((ev) => {
            const connectsBlocks = [
                "minecraft:chest",
            ];

            const baseCableConnections = [
                "mc:simple_cable",
                "mc:link_cable",
                "mc:terminal",
                "mc:control"
            ];

            const cables = [
                "mc:simple_cable",
                "mc:link_cable",
            ]

            setPermutation(ev.block, {
                "mc:n": baseCableConnections.includes(ev.block.north()?.getItemStack()?.typeId) || connectsBlocks.includes(ev.block.north()?.getItemStack()?.typeId),
                "mc:s": baseCableConnections.includes(ev.block.south()?.getItemStack()?.typeId) || connectsBlocks.includes(ev.block.south()?.getItemStack()?.typeId),
                "mc:w": baseCableConnections.includes(ev.block.west()?.getItemStack()?.typeId) || connectsBlocks.includes(ev.block.west()?.getItemStack()?.typeId),
                "mc:e": baseCableConnections.includes(ev.block.east()?.getItemStack()?.typeId) || connectsBlocks.includes(ev.block.east()?.getItemStack()?.typeId),
                "mc:u": baseCableConnections.includes(ev.block.above()?.getItemStack()?.typeId) || connectsBlocks.includes(ev.block.above()?.getItemStack()?.typeId),
                "mc:d": baseCableConnections.includes(ev.block.below()?.getItemStack()?.typeId) || connectsBlocks.includes(ev.block.below()?.getItemStack()?.typeId),
                "mc:n_con": connectsBlocks.includes(ev.block.north()?.getItemStack()?.typeId),
                "mc:s_con": connectsBlocks.includes(ev.block.south()?.getItemStack()?.typeId),
                "mc:w_con": connectsBlocks.includes(ev.block.west()?.getItemStack()?.typeId),
                "mc:e_con": connectsBlocks.includes(ev.block.east()?.getItemStack()?.typeId),
                "mc:u_con": connectsBlocks.includes(ev.block.above()?.getItemStack()?.typeId),
                "mc:d_con": connectsBlocks.includes(ev.block.above(-1)?.getItemStack()?.typeId),

            })

            for (const face of getAllFaces(ev.block)) {
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

        }),
        BlockEvents.OnTick(
            { interval_range: [4, 4], looping: true },
            (ev) => {
                const connectsBlocks = [
                    "minecraft:chest",
                ];
                const baseCableConnections = [
                    "mc:simple_cable",
                    "mc:link_cable"
                ];
                const cables = [
                    "mc:simple_cable",
                    "mc:link_cable",
                ]
                setPermutation(ev.block, {
                    "mc:n": baseCableConnections.includes(ev.block.north()?.getItemStack()?.typeId) || connectsBlocks.includes(ev.block.north()?.getItemStack()?.typeId),
                    "mc:s": baseCableConnections.includes(ev.block.south()?.getItemStack()?.typeId) || connectsBlocks.includes(ev.block.south()?.getItemStack()?.typeId),
                    "mc:w": baseCableConnections.includes(ev.block.west()?.getItemStack()?.typeId) || connectsBlocks.includes(ev.block.west()?.getItemStack()?.typeId),
                    "mc:e": baseCableConnections.includes(ev.block.east()?.getItemStack()?.typeId) || connectsBlocks.includes(ev.block.east()?.getItemStack()?.typeId),
                    "mc:u": baseCableConnections.includes(ev.block.above()?.getItemStack()?.typeId) || connectsBlocks.includes(ev.block.above()?.getItemStack()?.typeId),
                    "mc:d": baseCableConnections.includes(ev.block.below()?.getItemStack()?.typeId) || connectsBlocks.includes(ev.block.below()?.getItemStack()?.typeId),
                    "mc:n_con": connectsBlocks.includes(ev.block.north()?.getItemStack()?.typeId),
                    "mc:s_con": connectsBlocks.includes(ev.block.south()?.getItemStack()?.typeId),
                    "mc:w_con": connectsBlocks.includes(ev.block.west()?.getItemStack()?.typeId),
                    "mc:e_con": connectsBlocks.includes(ev.block.east()?.getItemStack()?.typeId),
                    "mc:u_con": connectsBlocks.includes(ev.block.above()?.getItemStack()?.typeId),
                    "mc:d_con": connectsBlocks.includes(ev.block.above(-1)?.getItemStack()?.typeId),

                })

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
                    } else {
                        if (face.getItemStack()?.typeId === "minecraft:chest") {
                            if (database[database[createId(ev.block)]]?.chests?.includes(createId(face))) return
                            if (database[database[createId(ev.block)]]) {
                                database[database[createId(ev.block)]].chests.push(createId(face))
                            }
                            else database[database[createId(ev.block)]] = { chests: [createId(face)] }
                        }
                    }
                }
            })
    ])