const fs = require("node:fs");
const { uuid, formatVersion, stringify } = require("../utils");

let add = "";

console.log("Start")
module.exports = class {
  constructor(name, description = "No author!!", options = {}) {
    this.name = name;
    this.description = name;
    this.files = "";
    this.build = options?.build ? options?.build : false
    this.overwrite = options?.overwrite ? options.overwrite : false
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
    return this;
  }
  addBlock(...arg) {
    for (const data of arg) {
      for (const key of Object.keys(data.run)) {
        if (data.run[key]) data.run[key](this);
      }
      if (!fs.existsSync(`${this.dirBe} BE/blocks`))
        fs.mkdirSync(`${this.dirBe} BE/blocks`, { recursive: true });
      fs.writeFileSync(
        `${this.dirBe + " BE"}/blocks/${data.filename}.json`,
        stringify(data.source, this.build),
      );
    }
    if (fs.existsSync(`${this.dirBe + " BE"}/scripts/blocks`)) {
      for (const fi of fs.readdirSync(`${this.dirBe + " BE"}/scripts/blocks`)) {
        this.files += `import "./blocks/${fi}"\n`;
      }
    }
    if (this.files) fs.writeFileSync(`${this.dirBe + " BE"}/scripts/index.js`, String(this.files));
    return this;
  }
  addItem(...arg) {
    for (const data of arg) {
      for (const key of Object.keys(data.run)) {
        if (data.run[key]) data.run[key](this);
      }
      if (!fs.existsSync(`${this.dirBe} BE/items`))
        fs.mkdirSync(`${this.dirBe} BE/items`, { recursive: true });
      fs.writeFileSync(
        `${this.dirBe + " BE"}/items/${data.filename}.json`,
        stringify(data.source, this.build),
      );
    }
    if (fs.existsSync(`${this.dirBe + " BE"}/scripts/items`)) {
      for (const fi of fs.readdirSync(`${this.dirBe + " BE"}/scripts/items`)) {
        this.files += `import "./items/${fi}"\n`;
      }
    }
    if (this.files) fs.writeFileSync(`${this.dirBe + " BE"}/scripts/index.js`, String(this.files));
    return this;
  }
  setRecipe(recipe) {
    if (!fs.existsSync(`${this.dirBe} BE/recipes`))
      fs.mkdirSync(`${this.dirBe} BE/recipes`, { recursive: true });
    var result = recipe.source;
    if (recipe.type === "minecraft:crafting_shaped") {
      result = {
        "format_version": "1.17.41",
        "minecraft:recipe_shaped": {
          "description": {
            "identifier": recipe.identifier,
          },
          "tags": recipe.tables,
          "pattern": recipe.pattern,
          "key": recipe.key,
          "unlock": recipe.unlock,
          "result": recipe.result,
        }
      }
    }

    fs.writeFileSync(
      `${this.dirBe + " BE"}/recipes/${recipe.identifier.split(":").pop()}.json`,
      stringify(result, this.build),
    );
    return this;
  }
};
console.log("End")