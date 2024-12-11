import { Addon, Block, Item, Recipe } from "../../index"

new Addon("Hello", "By MineCodeBR")
	.toManifestCreated("./result/hello")

	.addRecipe(
		new Recipe("mc:testee")
			.setKey({
				"#": {
					item: "minecraft:stone"
				}
			})
			.setType("minecraft:crafting_shaped")
			.setTables(["crafting_table", "altar"])
			.setPattern(["#", "#", "#"])
			.setResult({
				item: "mc:testee",
				count: 1
			})

	)
	.addBlock(
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
		new Item("mc:item_legal")
			.setTags("tag1", "tag2")
			.setItemTexture("stone", "textures/items/stone", "./grass.png")
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

