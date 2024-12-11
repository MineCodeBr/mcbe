import * as fs from 'node:fs'
import { uuid, formatVersion, stringify, js_stringify, log, log_warn } from "./utils";

import clc from 'cli-color'


import { Block, Item, Options, Recipe } from "../types"
export default class {
  name: string;
  description: string;
  files: string;
  build: boolean;
  overwrite: boolean;
  dirBe: string;
  dirRe: string;

  constructor(name: string, description: string, options?: Options) {
    log("Start")
    this.name = name;
    this.description = description || "No author!!";
    this.files = "";
    this.build = options?.build ? options?.build : false
    this.overwrite = options?.overwrite ? options.overwrite : false
    this.dirBe = "";
    this.dirRe = ""
  }
  toManifestCreated(dirBe: string, dirRe?: string) {
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
          min_engine_version: [...formatVersion.split(".")],
        },
        modules: [
          {
            description: this.description,
            type: "script",
            uuid: uuid(),
            version: [1, 0, 0],
            entry: "scripts/index.js",
          },
        ],
        capabilities: ["script_eval"],
        dependencies: [
          {
            module_name: "@minecraft/server",
            version: "1.15.0",
          },
          {
            module_name: "@minecraft/server-ui",
            version: "1.1.0",
          },
        ],
      },
      re: {
        format_version: 2,
        header: {
          description: this.description,
          name: this.name + " RE",
          uuid: uuid(),
          version: [1, 0, 0],
          min_engine_version: [...formatVersion.split(".")],
        },
        modules: [
          {
            description: this.description,
            type: "resources",
            uuid: uuid(),
            version: [1, 0, 0],
          },
        ],
      },
    };
    if (!fs.existsSync(this.dirRe + " RE") || !fs.existsSync(dirBe + " BE")) {
      if (!fs.existsSync(dirBe + " BE")) fs.mkdirSync(dirBe + " BE", { recursive: true });
      fs.writeFileSync(
        `${dirBe + " BE"}/manifest.json`,
        stringify(manifests["be"], this.build),
      );
      if (!fs.existsSync(this.dirRe + " RE")) fs.mkdirSync(this.dirRe + " RE", { recursive: true });
      fs.writeFileSync(
        `${this.dirRe + " RE"}/manifest.json`,
        stringify(manifests["re"], this.build),
      );
    }
    if (this.build) {
      fs.mkdirSync(`${dirBe} BE/scripts`)
      fs.writeFileSync(`${dirBe} BE/scripts/index.js`, 'import * as mc from "@minecraft/server";')
    }

    return this;
  }
  addBlock(...arg: Block[]) {
    for (const data of arg) {
      log_warn("BLOCK", `Created block ${clc.bgBlack(data.filename + ".json")}`)
      Object.keys(data.run).map(key => ((data?.run as any)[key as string]) ? (data?.run as any)[key as string](this) : null)

      if (!fs.existsSync(`${this.dirBe} BE/blocks`)) fs.mkdirSync(`${this.dirBe} BE/blocks`, { recursive: true });
      this.files += `import "./blocks/${data.filename}";\n`;
      fs.writeFileSync(
        `${this.dirBe + " BE"}/blocks/${data.filename}.json`,
        stringify(data.source, this.build),
      );
    }
    if (this.build) return this
    if (this.files) fs.writeFileSync(`${this.dirBe + " BE"}/scripts/index.js`, js_stringify(this.files, this.build));
    return this;
  }
  addItem(...arg: Item[]) {
    for (const data of arg) {
      log_warn("ITEM", `Created item ${clc.bgBlack(data.filename + ".json")}`)
      for (const key of Object.keys(data.run)) {
        if ((data?.run as any)[key as string]) (data?.run as any)[key as string](this);
      }
      this.files += `import "./blocks/${data.filename}";\n`;
      if (!fs.existsSync(`${this.dirBe} BE/items`))
        fs.mkdirSync(`${this.dirBe} BE/items`, { recursive: true });
      fs.writeFileSync(
        `${this.dirBe + " BE"}/items/${data.filename}.json`,
        stringify(data.source, this.build),
      );
    }
    if (this.build) return this
    if (this.files) fs.writeFileSync(`${this.dirBe + " BE"}/scripts/index.js`, js_stringify(this.files, this.build));
    return this;
  }
  addRecipe(...arg: Recipe[]) {
    for (const data of arg) {
      log_warn("RECIPE", `Created recipe ${clc.bgBlack(data.filename + ".json")}`)
      const recipe = data.source
      if (!fs.existsSync(`${this.dirBe} BE/recipes`))
        fs.mkdirSync(`${this.dirBe} BE/recipes`, { recursive: true });
      if (recipe.type === "minecraft:crafting_shaped") {
        fs.writeFileSync(
          `${this.dirBe + " BE"}/recipes/${recipe.identifier.split(":").pop()}.json`,
          stringify(data.source, this.build),
        );
      }
    }
    return this;
  }
}