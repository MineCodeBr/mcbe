import fs, { ReadStream } from "node:fs"
import { formatVersion, js_stringify, log, log_error, stringify } from "./utils"
import { Addon, BlockCustomComponentsType } from "../types"
import { BlockCustomComponent, BlockEvent } from "@minecraft/server"

export default class {
  id: string;
  filename: string;
  source: any;
  script: string;
  allScript: string;
  run: {
    lootCopy?: (v: Addon) => void,
    executeTerrainTexture?: (v: Addon) => void,
    executeGemotry?: (v: Addon) => void,
    set_custom_component?: (v: Addon) => void
  };

  constructor(id: string) {
    this.id = id || "mc:block";
    this.filename = id.split(":")[1];
    this.allScript = "";
    this.script = `import * as mc from "@minecraft/server";
    mc.world.beforeEvents.worldInitialize.subscribe(data => {
      //body
    })`
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
  setStates(states: object) {
    this.source["minecraft:block"]["description"]["states"] = states;
    return this;
  }
  setPermutations(permutations: object[]) {
    this.source["minecraft:block"]["permutations"] = permutations;
    return this;
  }
  setComponent(name: string, value: { dest: string, loot: object } | any) {
    if (name === "minecraft:loot" && value["dest"]) {
      const arg = value["dest"].split("/");
      this.run["lootCopy"] = (v: any) => {
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
  setMaterialTexture(data: string | object | any) {
    if (typeof data === "string")
      this.source["minecraft:block"]["components"]["minecraft:material_instances"] = {
        "*": { texture: data, },
      };
    else if (typeof data === "object") {
      const result: any = {};
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
  setTerrainTexture(name: string, value: string, src: string) {
    this.run["executeTerrainTexture"] = (v) => {
      if (!fs.existsSync(`${v.dirRe} RE/textures/blocks`))
        fs.mkdirSync(`${v.dirRe} RE/textures/blocks`, { recursive: true });
      let data: any = {
        num_mip_levels: 4,
        padding: 8,
        resource_pack_name: "vanilla",
        texture_data: {}
      };

      if (fs.existsSync(`${v.dirRe} RE/textures/terrain_texture.json`))
        data = JSON.parse(
          String(fs.readFileSync(`${v.dirRe} RE/textures/terrain_texture.json`))
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
  setGeometry(file: string, boneVisibility: object) {
    if (!fs.existsSync(file)) log_error("Geometria file nao existe")
    const readGeo = JSON.parse(String(fs.readFileSync(file)));
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
      // console.log(file.replaceAll("./", ""))
      fs.writeFileSync(`${v.dirRe} RE/models/blocks/${file.split('/').pop()}`, stringify(JSON.parse(String(fs.readFileSync(`${file}`))), v.build));
    };
    return this;
  }
  setCustomComponent(customName: string, customComponent: BlockCustomComponent, options?: {
    interval_range?: number[],
    readonly looping?: boolean | false
  } | { min_fall_distance?: number }) {
    this.source["minecraft:block"]["components"]["minecraft:custom_components"].push(customName);

    this.allScript += `data.blockComponentRegistry.registerCustomComponent("nameCustomComp", {${Object.values(customComponent).map(v => js_stringify(String(v)))}});`
      .replaceAll(/nameCustomComp/ig, String(customName))

    Object.keys(customComponent).map(v => {
      if (v == "onTick") this.source["minecraft:block"]["components"]["minecraft:tick"] = options
      if (v == "onEntityFallOn") this.source["minecraft:block"]["components"]["minecraft:entity_fall_on"] = options
    })
    this.run["set_custom_component"] = (v) => {
      const data = this.script.replace("//body", this.allScript)

      if (v.build) {
        fs.appendFileSync(`${v.dirBe} BE/scripts/index.js`, js_stringify(data.replaceAll(`import * as mc from "@minecraft/server";`, ""), v.build));
        return this;
      }
      if (!fs.existsSync(`${v.dirBe} BE/scripts/blocks`)) fs.mkdirSync(`${v.dirBe} BE/scripts/blocks`, { recursive: true });
      fs.writeFileSync(`${v.dirBe} BE/scripts/blocks/${this.filename}.js`, js_stringify(data, v.build));
    };
    return this;
  }
};
