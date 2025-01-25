//const { world } = require("@minecraft/server");
const { Block, BlockComponents, BlockEvents } = require("../../src")
//const mc = require("@minecraft/server")

module.exports = new Block("simple_cable")
    .setStates("mc:n", [false, true])
    .setStates("mc:s", [false, true])
    .setStates("mc:w", [false, true])
    .setStates("mc:e", [false, true])
    .setStates("mc:u", [false, true])
    .setStates("mc:d", [false, true])
    .setCategory("Items")
    .setGlobalScript('var database = {};const createId = (block)=> `${block.location.x}/${block.location.y}/${block.location.z}`; const getAllFaces = (block) => [block.north(), block.south(), block.west(), block.east(), block.above(), block.below()];const setPermutation = (block, state) => block.setPermutation(mc.BlockPermutation.resolve(block.getItemStack().typeId, { ...block.permutation.getAllStates(), ...state }))')
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
                n_con: "false",
                s_con: "false",
                w_con: "false",
                e_con: "false",
                u_con: "false",
                d_con: "false",
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
        BlockEvents.BlockBroken((ev) => {
            database = {}
        }),
        BlockEvents.OnClick((ev) => {
            console.warn(JSON.stringify(database));
            if (ev.player?.isSneaking) return mc.world.clearDynamicProperties();
            mc.world.getDynamicPropertyIds().forEach(id => {
                const state = mc.world.getDynamicProperty(id);
                console.warn(id);
            });
            return
            //console.warn("Clicked");
        }),
        BlockEvents.OnPlace((ev) => {
            const baseCableConnections = [
                "mc:simple_cable",
                "mc:link_cable",
                "mc:terminal",
                "mc:control"
            ];

            setPermutation(ev.block, {
                "mc:n": baseCableConnections.includes(ev.block.north()?.getItemStack()?.typeId),
                "mc:s": baseCableConnections.includes(ev.block.south()?.getItemStack()?.typeId),
                "mc:w": baseCableConnections.includes(ev.block.west()?.getItemStack()?.typeId),
                "mc:e": baseCableConnections.includes(ev.block.east()?.getItemStack()?.typeId),
                "mc:u": baseCableConnections.includes(ev.block.above()?.getItemStack()?.typeId),
                "mc:d": baseCableConnections.includes(ev.block.below()?.getItemStack()?.typeId),
            })

            for (const face of getAllFaces(ev.block)) {
                if (face.getItemStack()?.typeId === "mc:control") {
                    if (mc.world.getDynamicProperty(`control/${createId(face)}`)) {
                        database[createId(ev.block)] = mc.world.getDynamicProperty(`control/${createId(face)}`)
                    }
                } else if (face.getItemStack()?.typeId === "mc:simple_cable") {
                    if (database[createId(face)]) {
                        database[createId(ev.block)] = database[createId(face)]
                    }
                }
            }

        }),
        BlockEvents.OnTick(
            { interval_range: [4, 4], looping: true },
            (ev) => {
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
                    "mc:n": baseCableConnections.includes(ev.block.north()?.getItemStack()?.typeId),
                    "mc:s": baseCableConnections.includes(ev.block.south()?.getItemStack()?.typeId),
                    "mc:w": baseCableConnections.includes(ev.block.west()?.getItemStack()?.typeId),
                    "mc:e": baseCableConnections.includes(ev.block.east()?.getItemStack()?.typeId),
                    "mc:u": baseCableConnections.includes(ev.block.above()?.getItemStack()?.typeId),
                    "mc:d": baseCableConnections.includes(ev.block.below()?.getItemStack()?.typeId),
                })

                for (const face of getAllFaces(ev.block)) {
                    if (database[createId(ev.block)]) return
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
            })
    ])