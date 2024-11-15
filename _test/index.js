const { Addon, Block, Item, BlockCustomComponents, ItemCustomComponents } = require("../");

new Addon("Hello", "By MineCodeBR", { "build": true, overwrite: true })
	.toManifestCreated("./result/hello")
	.setRecipe({
		type: "minecraft:crafting_shaped",
		identifier: "mc:testee:test",
		tables: ["crafting_table", "altar"],
		pattern: ["#", "#", "#"],
		key: {
			"#": {
				item: "minecraft:stone"
			}
		},
		result: {
			item: "mc:testee",
			count: 1
		}
	})
	.addBlock(
		new Block("mc:testee")
			.setStates({
				"mc:testee": [0, 1, 2, 3, 4]
			})
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
			.setCustomComponent("sla", BlockCustomComponents.onTick, () => {
				console.warn("Test")
			},
				{
					"minecraft:tick": {
						"interval_range": [10, 20],
						"looping": true
					}
				})
			.setGeometry("./cube.geo.json", {
				bb_main: true,
			})
			.setTerrainTexture("grass", "textures/blocks/gras", "./grass.png")
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
	.addItem(
		new Item("mc:testee")
			.setTags("tag1", "tag2")
			.setItemTexture("stone", "textures/items/stone", "./grass.png")
			.setCustomComponent("mc:test", ItemCustomComponents.onUseOn, () => {
				console.log("Sla")
			})
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

