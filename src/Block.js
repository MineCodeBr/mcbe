const fs = require("node:fs");
const beautify = require("js-beautify")
const { formatVersion, stringify } = require("../utils")

let allComp = ""

const baseCustomBlock = `import * as mc from "@minecraft/server"

mc.world.beforeEvents.worldInitialize.subscribe(data => {
  //body
})`

module.exports = class {
  constructor(id) {
    this.id = id || "mc:block";
    this.filename = id.split(":")[1];
    this.source = {
      format_version: formatVersion,
      "minecraft:block": {
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
  setStates(states) {
    this.source["minecraft:block"]["description"]["states"] = states;
    return this;
  }
  setPermutations(permutations) {
    this.source["minecraft:block"]["minecraft:permutations"] = permutations;
    return this;
  }
  setComponent(name, value) {
    if (name === "minecraft:loot" && value["dest"]) {
      const arg = value["dest"].split("/");
      this.run["lootCopy"] = (v) => {
        if (
          !fs.existsSync(
            `${v.dirBe} BE/${value["dest"].replaceAll(arg[arg.length - 1], "")}`,
          )
        )
          fs.mkdirSync(
            `${v.dirBe} BE/${value["dest"].replaceAll(arg[arg.length - 1], "")}`,
            { recursive: true },
          );

        fs.writeFileSync(
          `${v.dirBe + " BE"}/${value["dest"]}`,
          stringify(value.loot, v.build),
        );
      };
      this.source["minecraft:block"]["components"][name] = value["dest"];
    } else this.source["minecraft:block"]["components"][name] = value;
    return this;
  }
  setMaterialTexture(data) {
    if (typeof data === "string")
      this.source["minecraft:block"]["components"]["minecraft:material_instances"] = {
        "*": { texture: data, },
      };
    else if (typeof data === "object") {
      let result = {};
      for (const key of Object.keys(data)) {
        result[key] = {
          texture: data[key],
        };
      }
      this.source["minecraft:block"]["components"][
        "minecraft:material_instances"
      ] = result;
    }
    return this;
  }
  setTerrainTexture(name, value, src) {
    this.run["executeTerrainTexture"] = (v) => {
      if (!fs.existsSync(`${v.dirRe} RE/textures/blocks`))
        fs.mkdirSync(`${v.dirRe} RE/textures/blocks`, { recursive: true });
      let data = {
        num_mip_levels: 4,
        padding: 8,
        resource_pack_name: "vanilla",
        texture_data: {},
      };

      if (fs.existsSync(`${v.dirRe} RE/textures/terrain_texture.json`))
        data = JSON.parse(
          fs.readFileSync(`${v.dirRe} RE/textures/terrain_texture.json`),
        );

      fs.copyFileSync(src, `${v.dirRe} RE/${value}.png`);

      data["texture_data"][name] = { textures: value };

      fs.writeFileSync(
        `${v.dirRe} RE/textures/terrain_texture.json`,
        stringify(data, v.build),
      );
    };

    return this;
  }
  setGeometry(file, boneVisibility = false) {
    const readGeo = JSON.parse(fs.readFileSync(file));
    if (boneVisibility) {
      this.source["minecraft:block"]["components"]["minecraft:geometry"] = {
        identifier:
          readGeo["minecraft:geometry"][0]["description"]["identifier"],
        bone_visibility: {
          ...boneVisibility,
        },
      };
    } else {
      this.source["minecraft:block"]["components"]["minecraft:geometry"] =
        readGeo["minecraft:geometry"][0]["description"]["identifier"];
    }

    this.run["executeGemotry"] = (v) => {
      if (!fs.existsSync(`${v.dirRe} RE/models/blocks`))
        fs.mkdirSync(`${v.dirRe} RE/models/blocks`, { recursive: true });
      fs.copyFileSync(file, `${v.dirRe} RE/models/blocks/${file}`);
    };
    return this;
  }
  setCustomComponent(customName, typeComponent, callback, options) {
    this.source["minecraft:block"]["components"]["minecraft:custom_components"].push(customName);
    const addComp = `data.blockComponentRegistry.registerCustomComponent("nameCustomComp", {"nameEvent": replaceCode,
    })
    `
      .replaceAll(/replaceCode/ig, String(callback))
      .replaceAll(/nameCustomComp/ig, String(customName))
      .replaceAll(/nameEvent/ig, String(typeComponent))
    allComp += addComp
    if (Object.keys(options)[0]) this.source["minecraft:block"]["components"][Object.keys(options)[0]] = options[Object.keys(options)[0]]
    this.run["set_custom_component"] = (v) => {
      const data = baseCustomBlock.replace("//body", allComp)


      if (!fs.existsSync(`${v.dirBe} BE/scripts/blocks`))
        fs.mkdirSync(`${v.dirBe} BE/scripts/blocks`, { recursive: true });
      fs.writeFileSync(`${v.dirBe} BE/scripts/blocks/${this.filename}.js`, beautify(data));
    };
    return this;
  }
};
