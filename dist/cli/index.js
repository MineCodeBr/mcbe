#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// cli/index.ts
var import_node_fs3 = __toESM(require("fs"));

// src/utils.ts
var import_js_beautify = __toESM(require("js-beautify"));
var import_cli_color = __toESM(require("cli-color"));
var log_warn = (name, description) => console.log(import_cli_color.default.bgBlack.green(` MCBE`) + import_cli_color.default.bgBlack.blue(` ${name} `) + " " + description);
var log = (value) => console.log(import_cli_color.default.bgBlack.green(" MCBE ") + " " + value);
var log_error = (value) => {
  console.log(import_cli_color.default.bgBlack.green(" MCBE ") + import_cli_color.default.bgBlack.red("ERROR ") + " " + value);
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
  return build ? (0, import_js_beautify.default)(String(object), { indent_size: 0, space_in_empty_paren: false }).replaceAll("\n", "") : (0, import_js_beautify.default)(String(object), { indent_size: 2, space_in_empty_paren: true });
}

// cli/index.ts
var import_cli_color4 = __toESM(require("cli-color"));

// src/Addon.ts
var fs = __toESM(require("fs"));
var import_cli_color2 = __toESM(require("cli-color"));
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
  addBlock(...arg2) {
    for (const data of arg2) {
      log_warn("BLOCK", `Created block ${import_cli_color2.default.bgBlack(data.filename + ".json")}`);
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
  addItem(...arg2) {
    for (const data of arg2) {
      log_warn("ITEM", `Created item ${import_cli_color2.default.bgBlack(data.filename + ".json")}`);
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
  addRecipe(...arg2) {
    for (const data of arg2) {
      log_warn("RECIPE", `Created recipe ${import_cli_color2.default.bgBlack(data.filename + ".json")}`);
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
var import_node_fs = __toESM(require("fs"));

// src/Item.ts
var import_node_fs2 = __toESM(require("fs"));
var import_cli_color3 = __toESM(require("cli-color"));

// cli/index.ts
var baseUrl = process.cwd();
var arg = process.argv;
if (!arg[2] || arg[2] === "help") {
  log("Simple cli of Minecraft Bedrock [BETA]");
  console.log(`
 ${import_cli_color4.default.bgBlack("Example: mcbe [command] [option]")}
 Commands
    help - Guia da cli
    init - Cria uma simples base para sua criacao de addon
    build - Cria uma build de seus codigos
    run - Executa de forma mais rapido e mais pesada
`);
}
if (arg[2] === "run" || arg[2] === "build") {
  if (!import_node_fs3.default.existsSync("./config.json")) log_error(`Not found ${import_cli_color4.default.bgBlack(" config.json ")}`);
  const { name, description, compile = { outPutBeh: name, outPutRes: void 0 } } = JSON.parse(String(import_node_fs3.default.readFileSync("./config.json")));
  const addon = new Addon_default(name, description, arg[2] === "build" ? { build: true, overwrite: true } : {});
  if (arg[2] === "build") {
    import_node_fs3.default.rmSync(compile.outPutBeh + " BE", { recursive: true, force: true });
    import_node_fs3.default.rmSync(compile.outPutRes + " RE", { recursive: true, force: true });
  }
  addon.toManifestCreated(compile.outPutBeh, compile.outPutRes);
  if (import_node_fs3.default.existsSync("./items")) {
    import_node_fs3.default.readdirSync("./items").map(async (file) => {
      const item = require(baseUrl + `/items/${file}`);
      addon.addItem(item);
    });
  }
  if (import_node_fs3.default.existsSync("./blocks")) {
    import_node_fs3.default.readdirSync("./blocks").map(async (file) => {
      const item = require(baseUrl + `/blocks/${file}`);
      addon.addBlock(item);
    });
  }
  if (arg[2] === "build") log_warn(import_cli_color4.default.yellow("BUILD"), "Sucess");
}
//# sourceMappingURL=index.js.map