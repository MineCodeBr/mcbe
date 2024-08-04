# mcbe
An npm to help addon creators
## Install
```bash
npm i mcbe
```
## Usage
```js
const { Addon, Block, Item } = require("mcbe");

new Addon("Hello", "By MineCodeBR")
	.toManifestCreated("./result/hello")
	.setRecipe({
		type: "minecraft:crafting_shaped",
		identifier: "mc:testee",
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
			//.setComponent("minecraft:boolean", true)
			//.setComponent("minecraft:object", { up: false })
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
			})           //  src
			.setGeometry("./cube.geo.json", {
				bb_main: true,
			})
			.setTerrainTexture("grass", "textures/blocks/gras", "./grass.png")
			.setMaterialTexture({
				"*": "stone",						//Default
				"minecraft:stone": "stone"
			})
	)
	.addItem(
		new Item("mc:testee")
			.setComponent("minecraft:display_name", {
				value: "Hello"
			})
	);	


//Use it to lend a hand :>
```
## Result
![Result](https://imgur.com/7YJC0gF)
## Nessesary
![Result](https://imgur.com/WR6Byrr)
## My Server
[Server Discord](https://discord.gg/6gFuNQdqky)
