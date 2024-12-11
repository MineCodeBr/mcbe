const { Block } = require("../../../dist/index");


module.exports = (
    new Block("mc:bloco_legal")
        .setStates({
            "mc:testee": [0, 1, 2, 3, 4]
        })
        .setComponent('sla', 'fjhdhsgfyuds')
        .setComponent("minecraft:light_dampening", 0)
        .setComponent("minecraft:loot", {
            dest: "loot_tables/hello/nhem.json",
            loot: {
                rolls: 1,
                entries: [
                    {
                        type: "item",
                        name: "minecraft:apple",
                    },
                ],
            },
        })
        .setCustomComponent("sla",
            {
                onTick(t) {
                    t.block
                },
                onEntityFallOn(arg) {
                    arg.block
                },
            },
            {
                interval_range: [4, 5],
                looping: true
            }
        )
        .setGeometry("./assets/cube.geo.json", {
            bb_main: true,
        })
        .setTerrainTexture("grass", "textures/blocks/gras", "./assets/grass.png")
        .setMaterialTexture({
            "*": "stone",
            up: "grass",
            down: "grass",
        })
        .setPermutations([
            {
                "condition": "query.is_block('minecraft:stone')",
                "components": {
                    "minecraft:friction": 0.1
                }
            }
        ])
)