#!/usr/bin/env node
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// cli/index.ts
import fs2 from "node:fs";

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

// cli/index.ts
import clc4 from "cli-color";

// src/Addon.ts
import * as fs from "node:fs";
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
  addBlock(...arg2) {
    for (const data of arg2) {
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
  addItem(...arg2) {
    for (const data of arg2) {
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
  addRecipe(...arg2) {
    for (const data of arg2) {
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

// src/Item.ts
import clc3 from "cli-color";

// cli/index.ts
var baseUrl = process.cwd();
var arg = process.argv;
if (!arg[2] || arg[2] === "help") {
  log("Simple cli of Minecraft Bedrock [BETA]");
  console.log(`
 ${clc4.bgBlack("Example: mcbe [command] [option]")}
 Commands
    help - Guia da cli
    init - Cria uma simples base para sua criacao de addon
    build - Cria uma build de seus codigos
    run - Executa de forma mais rapido e mais pesada
`);
}
if (arg[2] === "run" || arg[2] === "build") {
  if (!fs2.existsSync("./config.json")) log_error(`Not found ${clc4.bgBlack(" config.json ")}`);
  const { name, description, compile = { outPutBeh: name, outPutRes: void 0 } } = JSON.parse(String(fs2.readFileSync("./config.json")));
  const addon = new Addon_default(name, description, arg[2] === "build" ? { build: true, overwrite: true } : {});
  if (arg[2] === "build") {
    fs2.rmSync(compile.outPutBeh + " BE", { recursive: true, force: true });
    fs2.rmSync(compile.outPutRes + " RE", { recursive: true, force: true });
  }
  addon.toManifestCreated(compile.outPutBeh, compile.outPutRes);
  if (fs2.existsSync("./items")) {
    fs2.readdirSync("./items").map(async (file) => {
      const item = __require(baseUrl + `/items/${file}`);
      addon.addItem(item);
    });
  }
  if (fs2.existsSync("./blocks")) {
    fs2.readdirSync("./blocks").map(async (file) => {
      const item = __require(baseUrl + `/blocks/${file}`);
      addon.addBlock(item);
    });
  }
  if (arg[2] === "build") log_warn(clc4.yellow("BUILD"), "Sucess");
}
//# sourceMappingURL=index.mjs.map