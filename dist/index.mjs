// src/Addon.ts
import * as fs from "node:fs";

// src/utils.ts
import js_beautify from "js-beautify";
import clc from "cli-color";
var log_warn = (name, description) => console.log(clc.bgBlack.green(` MCBE`) + clc.bgBlack.blue(` ${name} `) + " " + description);
var log = (value) => console.log(clc.bgBlack.green(" MCBE ") + " " + value);
var log_error = (value) => {
  console.log(clc.bgBlack.green(" MCBE ") + clc.bgBlack.red("ERROR ") + " " + value);
  process.exit();
};
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
var formatVersion = "1.21.40";
function stringify(object, build) {
  return build ? JSON.stringify(object) : JSON.stringify(object, null, 2);
}
function js_stringify(object, build) {
  return build ? js_beautify(String(object), { indent_size: 0, space_in_empty_paren: false }).replaceAll("\n", "") : js_beautify(String(object), { indent_size: 2, space_in_empty_paren: true });
}

// src/Addon.ts
import clc2 from "cli-color";
var Addon_default = class {
  name;
  description;
  files;
  build;
  overwrite;
  dirBe;
  dirRe;
  constructor(name, description, options) {
    log("Start");
    this.name = name;
    this.description = description || "No author!!";
    this.files = "";
    this.build = options?.build ? options?.build : false;
    this.overwrite = options?.overwrite ? options.overwrite : false;
    this.dirBe = "";
    this.dirRe = "";
  }
  toManifestCreated(dirBe, dirRe) {
    this.dirBe = dirBe;
    this.dirRe = dirRe || dirBe;
    if (this.overwrite) {
      fs.rmSync(this.dirRe + " RE", { recursive: true, force: true });
      fs.rmSync(this.dirBe + " BE", { recursive: true, force: true });
    }
    const manifests = {
      be: {
        format_version: 2,
        header: {
          description: this.description,
          name: this.name + " BE",
          uuid: uuid(),
          version: [0, 0, 1],
          min_engine_version: [...formatVersion.split(".")]
        },
        modules: [
          {
            description: this.description,
            type: "script",
            uuid: uuid(),
            version: [1, 0, 0],
            entry: "scripts/index.js"
          }
        ],
        capabilities: ["script_eval"],
        dependencies: [
          {
            module_name: "@minecraft/server",
            version: "1.15.0"
          },
          {
            module_name: "@minecraft/server-ui",
            version: "1.1.0"
          }
        ]
      },
      re: {
        format_version: 2,
        header: {
          description: this.description,
          name: this.name + " RE",
          uuid: uuid(),
          version: [1, 0, 0],
          min_engine_version: [...formatVersion.split(".")]
        },
        modules: [
          {
            description: this.description,
            type: "resources",
            uuid: uuid(),
            version: [1, 0, 0]
          }
        ]
      }
    };
    if (!fs.existsSync(this.dirRe + " RE") || !fs.existsSync(dirBe + " BE")) {
      if (!fs.existsSync(dirBe + " BE")) fs.mkdirSync(dirBe + " BE", { recursive: true });
      fs.writeFileSync(
        `${dirBe + " BE"}/manifest.json`,
        stringify(manifests["be"], this.build)
      );
      if (!fs.existsSync(this.dirRe + " RE")) fs.mkdirSync(this.dirRe + " RE", { recursive: true });
      fs.writeFileSync(
        `${this.dirRe + " RE"}/manifest.json`,
        stringify(manifests["re"], this.build)
      );
    }
    if (this.build) {
      fs.mkdirSync(`${dirBe} BE/scripts`);
      fs.writeFileSync(`${dirBe} BE/scripts/index.js`, 'import * as mc from "@minecraft/server";');
    }
    return this;
  }
  addBlock(...arg) {
    for (const data of arg) {
      log_warn("BLOCK", `Created block ${clc2.bgBlack(data.filename + ".json")}`);
      Object.keys(data.run).map((key) => (data?.run)[key] ? (data?.run)[key](this) : null);
      if (!fs.existsSync(`${this.dirBe} BE/blocks`)) fs.mkdirSync(`${this.dirBe} BE/blocks`, { recursive: true });
      this.files += `import "./blocks/${data.filename}";
`;
      fs.writeFileSync(
        `${this.dirBe + " BE"}/blocks/${data.filename}.json`,
        stringify(data.source, this.build)
      );
    }
    if (this.build) return this;
    if (this.files) fs.writeFileSync(`${this.dirBe + " BE"}/scripts/index.js`, js_stringify(this.files, this.build));
    return this;
  }
  addItem(...arg) {
    for (const data of arg) {
      log_warn("ITEM", `Created item ${clc2.bgBlack(data.filename + ".json")}`);
      for (const key of Object.keys(data.run)) {
        if ((data?.run)[key]) (data?.run)[key](this);
      }
      this.files += `import "./blocks/${data.filename}";
`;
      if (!fs.existsSync(`${this.dirBe} BE/items`))
        fs.mkdirSync(`${this.dirBe} BE/items`, { recursive: true });
      fs.writeFileSync(
        `${this.dirBe + " BE"}/items/${data.filename}.json`,
        stringify(data.source, this.build)
      );
    }
    if (this.build) return this;
    if (this.files) fs.writeFileSync(`${this.dirBe + " BE"}/scripts/index.js`, js_stringify(this.files, this.build));
    return this;
  }
  addRecipe(...arg) {
    for (const data of arg) {
      log_warn("RECIPE", `Created recipe ${clc2.bgBlack(data.filename + ".json")}`);
      const recipe = data.source;
      if (!fs.existsSync(`${this.dirBe} BE/recipes`))
        fs.mkdirSync(`${this.dirBe} BE/recipes`, { recursive: true });
      if (recipe.type === "minecraft:crafting_shaped") {
        fs.writeFileSync(
          `${this.dirBe + " BE"}/recipes/${recipe.identifier.split(":").pop()}.json`,
          stringify(data.source, this.build)
        );
      }
    }
    return this;
  }
};

// src/Block.ts
import fs2 from "node:fs";
var Block_default = class {
  id;
  filename;
  source;
  script;
  allScript;
  run;
  constructor(id) {
    this.id = id || "mc:block";
    this.filename = id.split(":")[1];
    this.allScript = "";
    this.script = `import * as mc from "@minecraft/server";
    mc.world.beforeEvents.worldInitialize.subscribe(data => {
      //body
    })`;
    this.source = {
      format_version: formatVersion,
      "minecraft:block": {
        description: {
          identifier: this.id,
          menu_category: {
            category: "items"
          }
        },
        components: {
          "minecraft:custom_components": []
        }
      }
    };
    this.run = {};
  }
  setStates(states) {
    this.source["minecraft:block"]["description"]["states"] = states;
    return this;
  }
  setPermutations(permutations) {
    this.source["minecraft:block"]["permutations"] = permutations;
    return this;
  }
  setComponent(name, value) {
    if (name === "minecraft:loot" && value["dest"]) {
      const arg = value["dest"].split("/");
      this.run["lootCopy"] = (v) => {
        if (!fs2.existsSync(
          `${v.dirBe} BE/${value["dest"].replaceAll(arg[arg.length - 1], "")}`
        ))
          fs2.mkdirSync(
            `${v.dirBe} BE/${value["dest"].replaceAll(arg[arg.length - 1], "")}`,
            { recursive: true }
          );
        fs2.writeFileSync(
          `${v.dirBe + " BE"}/${value["dest"]}`,
          stringify(value.loot, v.build)
        );
      };
      this.source["minecraft:block"]["components"][name] = value["dest"];
    } else this.source["minecraft:block"]["components"][name] = value;
    return this;
  }
  setMaterialTexture(data) {
    if (typeof data === "string")
      this.source["minecraft:block"]["components"]["minecraft:material_instances"] = {
        "*": { texture: data }
      };
    else if (typeof data === "object") {
      const result = {};
      for (const key of Object.keys(data)) {
        result[key] = {
          texture: data[key]
        };
      }
      this.source["minecraft:block"]["components"]["minecraft:material_instances"] = result;
    }
    return this;
  }
  setTerrainTexture(name, value, src) {
    this.run["executeTerrainTexture"] = (v) => {
      if (!fs2.existsSync(`${v.dirRe} RE/textures/blocks`))
        fs2.mkdirSync(`${v.dirRe} RE/textures/blocks`, { recursive: true });
      let data = {
        num_mip_levels: 4,
        padding: 8,
        resource_pack_name: "vanilla",
        texture_data: {}
      };
      if (fs2.existsSync(`${v.dirRe} RE/textures/terrain_texture.json`))
        data = JSON.parse(
          String(fs2.readFileSync(`${v.dirRe} RE/textures/terrain_texture.json`))
        );
      fs2.copyFileSync(src, `${v.dirRe} RE/${value}.png`);
      data["texture_data"][name] = { textures: value };
      fs2.writeFileSync(
        `${v.dirRe} RE/textures/terrain_texture.json`,
        stringify(data, v.build)
      );
    };
    return this;
  }
  setGeometry(file, boneVisibility) {
    if (!fs2.existsSync(file)) log_error("Geometria file nao existe");
    const readGeo = JSON.parse(String(fs2.readFileSync(file)));
    if (boneVisibility) {
      this.source["minecraft:block"]["components"]["minecraft:geometry"] = {
        identifier: readGeo["minecraft:geometry"][0]["description"]["identifier"],
        bone_visibility: {
          ...boneVisibility
        }
      };
    } else {
      this.source["minecraft:block"]["components"]["minecraft:geometry"] = readGeo["minecraft:geometry"][0]["description"]["identifier"];
    }
    this.run["executeGemotry"] = (v) => {
      if (!fs2.existsSync(`${v.dirRe} RE/models/blocks`))
        fs2.mkdirSync(`${v.dirRe} RE/models/blocks`, { recursive: true });
      fs2.writeFileSync(`${v.dirRe} RE/models/blocks/${file.split("/").pop()}`, stringify(JSON.parse(String(fs2.readFileSync(`${file}`))), v.build));
    };
    return this;
  }
  setCustomComponent(customName, customComponent, options) {
    this.source["minecraft:block"]["components"]["minecraft:custom_components"].push(customName);
    this.allScript += `data.blockComponentRegistry.registerCustomComponent("nameCustomComp", {${Object.values(customComponent).map((v) => js_stringify(String(v)))}});`.replaceAll(/nameCustomComp/ig, String(customName));
    Object.keys(customComponent).map((v) => {
      if (v == "onTick") this.source["minecraft:block"]["components"]["minecraft:tick"] = options;
      if (v == "onEntityFallOn") this.source["minecraft:block"]["components"]["minecraft:entity_fall_on"] = options;
    });
    this.run["set_custom_component"] = (v) => {
      const data = this.script.replace("//body", this.allScript);
      if (v.build) {
        fs2.appendFileSync(`${v.dirBe} BE/scripts/index.js`, js_stringify(data.replaceAll(`import * as mc from "@minecraft/server";`, ""), v.build));
        return this;
      }
      if (!fs2.existsSync(`${v.dirBe} BE/scripts/blocks`)) fs2.mkdirSync(`${v.dirBe} BE/scripts/blocks`, { recursive: true });
      fs2.writeFileSync(`${v.dirBe} BE/scripts/blocks/${this.filename}.js`, js_stringify(data, v.build));
    };
    return this;
  }
};

// src/Item.ts
import fs3 from "node:fs";
import clc3 from "cli-color";
var Item_default = class {
  id;
  filename;
  source;
  baseCustomItem;
  allComp;
  run;
  constructor(id) {
    this.id = id || "mc:item";
    this.filename = id.split(":")[1];
    this.allComp = "";
    this.baseCustomItem = `import * as mc from "@minecraft/server";
        mc.world.beforeEvents.worldInitialize.subscribe(data => {
          //body
        });`;
    this.source = {
      format_version: formatVersion,
      "minecraft:item": {
        description: {
          identifier: this.id,
          menu_category: {
            category: "items"
          }
        },
        components: {
          "minecraft:custom_components": []
        }
      }
    };
    this.run = {};
  }
  setComponent(name, value) {
    this.source["minecraft:item"]["components"][name] = value;
    return this;
  }
  setTags(...tags) {
    if (typeof tags == "string") this.source["minecraft:item"]["components"]["minecraft:tag"] = { "tags": [tags] };
    else this.source["minecraft:item"]["components"]["minecraft:tag"] = { "tags": [...tags] };
    return this;
  }
  setItemTexture(name, value, src) {
    this.run["set_item_texture"] = (v) => {
      if (!fs3.existsSync(`${v.dirRe} RE/textures/items`))
        fs3.mkdirSync(`${v.dirRe} RE/textures/items`, { recursive: true });
      let data = {
        "resource_pack_name": "wiki",
        "texture_name": "atlas.items",
        texture_data: {}
      };
      if (fs3.existsSync(`${v.dirRe} RE/textures/item_texture.json`))
        data = JSON.parse(
          String(fs3.readFileSync(`${v.dirRe} RE/textures/item_texture.json`))
        );
      fs3.copyFile(src, `${v.dirRe} RE/${value}.png`, (err) => {
        if (err) log_error(`Textura definida nao existe ${clc3.greenBright(src)}`);
      });
      data["texture_data"][name] = { textures: value };
      fs3.writeFileSync(
        `${v.dirRe} RE/textures/item_texture.json`,
        stringify(data, v.build)
      );
    };
    return this;
  }
  setCustomComponent(customName, customComponent) {
    this.source["minecraft:item"]["components"]["minecraft:custom_components"].push(customName);
    const addComp = `data.itemComponentRegistry.registerCustomComponent("nameCustomComp", {${Object.values(customComponent).map((v) => js_stringify(String(v)))}})`.replaceAll(/nameCustomComp/ig, String(customName));
    this.allComp += addComp;
    this.run["set_custom_component"] = (v) => {
      const data = this.baseCustomItem.replace("//body", this.allComp);
      if (v.build) {
        fs3.appendFileSync(`${v.dirBe} BE/scripts/index.js`, js_stringify(data.replaceAll(`import * as mc from "@minecraft/server";`, ""), v.build));
        return this;
      }
      if (!fs3.existsSync(`${v.dirBe} BE/scripts/items`))
        fs3.mkdirSync(`${v.dirBe} BE/scripts/items`, { recursive: true });
      fs3.writeFileSync(`${v.dirBe} BE/scripts/items/${this.filename}.js`, js_stringify(data, v.build));
    };
    return this;
  }
};

// src/Recipe.ts
var Recipe_default = class {
  id;
  type;
  source;
  filename;
  constructor(id) {
    this.type = "";
    this.filename = id.split(":")[1];
    this.id = id;
    this.source = {
      "minecraft:recipe_shaped": {
        "tags": [],
        "pattern": []
      }
    };
  }
  setType(type) {
    this.type = type;
    return this;
  }
  setTables(tables) {
    this.source["minecraft:recipe_shaped"].tags = tables;
    return this;
  }
  setPattern(pattern) {
    this.source["minecraft:recipe_shaped"].pattern = pattern;
    return this;
  }
  setKey(key) {
    this.source["minecraft:recipe_shaped"].key = key;
    return this;
  }
  setResult(result) {
    this.source["minecraft:recipe_shaped"].result = result;
    return this;
  }
  toJSON() {
    return this.source;
  }
};

// index.ts
var mcbe_default = { Addon: Addon_default, Block: Block_default, Item: Item_default, Recipe: Recipe_default };
export {
  Addon_default as Addon,
  Block_default as Block,
  Item_default as Item,
  Recipe_default as Recipe,
  mcbe_default as default
};
//# sourceMappingURL=index.mjs.map