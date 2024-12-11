import fs from "node:fs"
import { ItemCustomComponent } from "@minecraft/server";
import { Addon } from "../types";
import { js_stringify, formatVersion, stringify, log_error } from "./utils";
import clc from "cli-color";


export default class {
    id: string;
    filename: string;
    source: any;
    baseCustomItem: string;
    allComp: string;
    run: {
        set_item_texture?: (v: Addon) => void,
        set_custom_component?: (v: Addon) => void
    }

    constructor(id: string) {
        this.id = id || "mc:item";
        this.filename = id.split(":")[1];
        this.allComp = ""
        this.baseCustomItem = `import * as mc from "@minecraft/server";
        mc.world.beforeEvents.worldInitialize.subscribe(data => {
          //body
        });`
        this.source = {
            format_version: formatVersion,
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
    setComponent(name: string, value: string | boolean | object) {
        this.source["minecraft:item"]["components"][name] = value;
        return this;
    }
    setTags(...tags: string[]) {
        if (typeof tags == "string") this.source["minecraft:item"]["components"]["minecraft:tag"] = { "tags": [tags] }
        else this.source["minecraft:item"]["components"]["minecraft:tag"] = { "tags": [...tags] }
        return this;
    }
    setItemTexture(name: string, value: string, src: string) {
        this.run["set_item_texture"] = (v) => {
            if (!fs.existsSync(`${v.dirRe} RE/textures/items`))
                fs.mkdirSync(`${v.dirRe} RE/textures/items`, { recursive: true });
            let data = {
                "resource_pack_name": "wiki",
                "texture_name": "atlas.items",
                texture_data: {} as any,
            };

            if (fs.existsSync(`${v.dirRe} RE/textures/item_texture.json`))
                data = JSON.parse(
                    String(fs.readFileSync(`${v.dirRe} RE/textures/item_texture.json`))
                );


            fs.copyFile(src, `${v.dirRe} RE/${value}.png`, (err) => {
                if (err) log_error(`Textura definida nao existe ${clc.greenBright(src)}`)
            });

            data["texture_data"][name] = { textures: value };

            fs.writeFileSync(
                `${v.dirRe} RE/textures/item_texture.json`,
                stringify(data, v.build),
            );
        }
        return this;
    }
    setCustomComponent(customName: string, customComponent: ItemCustomComponent) {
        this.source["minecraft:item"]["components"]["minecraft:custom_components"].push(customName);
        const addComp = `data.itemComponentRegistry.registerCustomComponent("nameCustomComp", {${Object.values(customComponent).map(v => js_stringify(String(v)))}})`
            .replaceAll(/nameCustomComp/ig, String(customName))
        this.allComp += addComp
        this.run["set_custom_component"] = (v) => {
            const data = this.baseCustomItem.replace("//body", this.allComp)
            if (v.build) {
                fs.appendFileSync(`${v.dirBe} BE/scripts/index.js`, js_stringify(data.replaceAll(`import * as mc from "@minecraft/server";`, ""), v.build));
                return this;
            }
            if (!fs.existsSync(`${v.dirBe} BE/scripts/items`))
                fs.mkdirSync(`${v.dirBe} BE/scripts/items`, { recursive: true });
            fs.writeFileSync(`${v.dirBe} BE/scripts/items/${this.filename}.js`, js_stringify(data, v.build));
        };
        return this;
    }
};