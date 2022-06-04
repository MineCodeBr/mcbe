# mcbe
An npm to help addon creators
## Install
```bash
npm i mcbe
```
## Usage
```js
const mcbe = require('mcbe')
//Manifest Generator
const Manifest = mcbe.Manifest({
 name: "Manifest",
 description: "Description",
 manifest: 'br', //settable (r = resources || b = behavior)
 fileOut: false //settable
})
console.log(Manifest)
//Addon Template(only the folders)
mcbe.TemplateAddon({
 name: "Manifest",
 description: "Description"
})
//Formater Json
const Json = mcbe.Formater({
 code: {
  value: {
   hi: true
  }
 }
})
console.log(Json)
//ItemAutomatic(Name Generator)
const Name = mcbe.ItemAutomatic({
 generatorName: true, //required
 materials: [{
  "item": "iron"
 }]
})
console.log(Name)
//ItemAutomatic(Files)
const Item = mcbe.ItemAutomatic({
 generatorName: false, // not required
 name: "test",
 type: "pickaxe", //settable
 folder: "test",
 code: {
	"format_version": "1.17.0",
	"minecraft:item": {
	"identifier": `tem:${Name}`,
			"category": "items"
		},
		"components": {
			"minecraft:allow_off_hand": true,
			"minecraft:creative_category": {
				"parent": "itemGroup.name.nature"
			},
			"minecraft:display_name": {
				"value": `${Name}`
			},
			"minecraft:icon": {
				"frame": 0,
				"texture": "item"
			}
		},
		"events": {}
	},
 materials: [{
  "item": "iron"
 },
  {
   "item": "gold"
  },
 ]
})
//Use it to lend a hand :>
```
## My Server
[Server Discord](https://discord.io/minelab)
