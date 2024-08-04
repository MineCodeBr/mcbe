const fs = require("node:fs");


let allComp = ""
const baseCustomItem = `import * as mc from "@minecraft/server"

mc.world.beforeEvents.worldInitialize.subscribe(data => {
  //body
})`

module.exports = class {
    constructor(id) {
        this.id = id || "mc:item";
        this.filename = id.split(":")[1];
        this.source = {
            format_version: "1.21.10",
            "minecraft:item": {
                description: {
                    identifier: this.id,
                    menu_category: {
                        category: "items",
                    },
                },
                components: {
                    "minecraft:custom_components": [],
                },
            },
        };
        this.run = {};
    }
    setComponent(name, value) {
        this.source["minecraft:item"]["components"][name] = value;
        return this;
    }
    setTags(...tags) {
        if (typeof tags == "string") this.source["minecraft:item"]["components"]["minecraft:tag"] = { "tags": [tags] }
        else this.source["minecraft:item"]["components"]["minecraft:tag"] = { "tags": [...tags] }
        return this;
    }
    setItemTexture(name, value, src) {
        this.run["set_item_texture"] = (v) => {
            if (!fs.existsSync(`${v.dirRe} RE/textures/items`))
                fs.mkdirSync(`${v.dirRe} RE/textures/items`, { recursive: true });
            let data = {
                "resource_pack_name": "wiki",
                "texture_name": "atlas.items",
                texture_data: {},
            };

            if (fs.existsSync(`${v.dirRe} RE/textures/item_texture.json`))
                data = JSON.parse(
                    fs.readFileSync(`${v.dirRe} RE/textures/item_texture.json`),
                );

            fs.copyFileSync(src, `${v.dirRe} RE/${value}.png`);

            data["texture_data"][name] = { textures: value };

            fs.writeFileSync(
                `${v.dirRe} RE/textures/item_texture.json`,
                JSON.stringify(data, null, 2),
            );
        };
        return this;
    }
    setCustomComponent(nameCustomComp, name, callback) {
        this.source["minecraft:item"]["components"]["minecraft:custom_components"].push(nameCustomComp);
        const addComp = `data.itemComponentRegistry.registerCustomComponent("nameCustomComp", {"nameEvent": replaceCode,
    })
    `
            .replaceAll(/replaceCode/ig, String(callback))
            .replaceAll(/nameCustomComp/ig, String(nameCustomComp))
            .replaceAll(/nameEvent/ig, String(name))
        allComp += addComp
        this.run["set_custom_component"] = (v) => {
            const data = baseCustomItem.replace("//body", allComp)


            if (!fs.existsSync(`${v.dirBe} BE/scripts/items`))
                fs.mkdirSync(`${v.dirBe} BE/scripts/items`, { recursive: true });
            fs.writeFileSync(`${v.dirBe} BE/scripts/items/${this.filename}.js`, beautify(data));
        };
        return this;
    }
};