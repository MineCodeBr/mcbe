"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Addon: () => Addon,
  Block: () => Block,
  Item: () => Item,
  Sword: () => Sword
});
module.exports = __toCommonJS(index_exports);
var import_fs2 = require("fs");

// src/utils.ts
var import_chalk = __toESM(require("chalk"));
var import_crypto = require("crypto");
var import_fs = require("fs");
var warn = (arg, arg2) => console.warn(
  `${import_chalk.default.white.bgYellow.black(" MCBE ")} ${arg}${arg2 ? `
     > ${import_chalk.default.gray(arg2)}` : ""}`
);
var error = (arg, arg2) => {
  console.error(
    `${import_chalk.default.bgRed.black(" MCBE ")} ${arg}${arg2 ? `
     > ${import_chalk.default.gray(arg2)}` : ""}`
  );
};
var isExistRoute = (path) => {
  if (!(0, import_fs.existsSync)(path)) (0, import_fs.mkdirSync)(path, { recursive: true });
};
function CreateManifest({
  behDir,
  resDir,
  name,
  description
}) {
  let manifestBehavior = (0, import_fs.existsSync)(behDir + "/manifest.json") ? JSON.parse((0, import_fs.readFileSync)(behDir + "/manifest.json")) : (0, import_crypto.randomUUID)();
  let manifestResource = (0, import_fs.existsSync)(resDir + "/manifest.json") ? JSON.parse((0, import_fs.readFileSync)(resDir + "/manifest.json")) : (0, import_crypto.randomUUID)();
  const devUuid = manifestBehavior["header"] ? manifestBehavior["header"]["uuid"] : manifestBehavior;
  (0, import_fs.writeFileSync)(
    resDir + "/manifest.json",
    JSON.stringify({
      format_version: 2,
      header: {
        name,
        description,
        uuid: devUuid,
        version: [1, 0, 0],
        min_engine_version: [1, 20, 60]
      },
      modules: [
        {
          type: "resources",
          uuid: manifestResource["modules"] ? manifestResource["modules"][0]["uuid"] : manifestResource,
          version: [1, 0, 0]
        }
      ]
    })
  );
  (0, import_fs.writeFileSync)(
    behDir + "/manifest.json",
    JSON.stringify({
      format_version: 2,
      header: {
        name,
        description,
        uuid: manifestBehavior["header"] ? manifestBehavior["header"]["uuid"] : manifestBehavior,
        version: [1, 0, 0],
        min_engine_version: [1, 20, 60]
      },
      modules: [
        {
          uuid: manifestBehavior["modules"] ? manifestBehavior["modules"][0]["uuid"] : manifestBehavior,
          version: [1, 0, 0],
          type: "script",
          language: "javascript",
          entry: "scripts/index.js"
        }
      ],
      dependencies: [
        {
          module_name: "@minecraft/server",
          version: "1.16.0"
        },
        {
          module_name: "@minecraft/server-ui",
          version: "1.3.0"
        },
        {
          uuid: devUuid,
          version: [1, 0, 0]
        }
      ]
    })
  );
}
var MinecraftItemGroupsArray = [
  "minecraft:itemGroup.name.anvil",
  "minecraft:itemGroup.name.arrow",
  "minecraft:itemGroup.name.axe",
  "minecraft:itemGroup.name.banner",
  "minecraft:itemGroup.name.banner_pattern",
  "minecraft:itemGroup.name.bed",
  "minecraft:itemGroup.name.boat",
  "minecraft:itemGroup.name.boots",
  "minecraft:itemGroup.name.bundles",
  "minecraft:itemGroup.name.buttons",
  "minecraft:itemGroup.name.candles",
  "minecraft:itemGroup.name.chalkboard",
  "minecraft:itemGroup.name.chest",
  "minecraft:itemGroup.name.chestboat",
  "minecraft:itemGroup.name.chestplate",
  "minecraft:itemGroup.name.compounds",
  "minecraft:itemGroup.name.concrete",
  "minecraft:itemGroup.name.concretePowder",
  "minecraft:itemGroup.name.cookedFood",
  "minecraft:itemGroup.name.copper",
  "minecraft:itemGroup.name.coral",
  "minecraft:itemGroup.name.coral_decorations",
  "minecraft:itemGroup.name.crop",
  "minecraft:itemGroup.name.door",
  "minecraft:itemGroup.name.dye",
  "minecraft:itemGroup.name.enchantedBook",
  "minecraft:itemGroup.name.fence",
  "minecraft:itemGroup.name.fenceGate",
  "minecraft:itemGroup.name.firework",
  "minecraft:itemGroup.name.fireworkStars",
  "minecraft:itemGroup.name.flower",
  "minecraft:itemGroup.name.glass",
  "minecraft:itemGroup.name.glassPane",
  "minecraft:itemGroup.name.glazedTerracotta",
  "minecraft:itemGroup.name.goatHorn",
  "minecraft:itemGroup.name.grass",
  "minecraft:itemGroup.name.hanging_sign",
  "minecraft:itemGroup.name.helmet",
  "minecraft:itemGroup.name.hoe",
  "minecraft:itemGroup.name.horseArmor",
  "minecraft:itemGroup.name.leaves",
  "minecraft:itemGroup.name.leggings",
  "minecraft:itemGroup.name.lingeringPotion",
  "minecraft:itemGroup.name.log",
  "minecraft:itemGroup.name.minecart",
  "minecraft:itemGroup.name.miscFood",
  "minecraft:itemGroup.name.mobEgg",
  "minecraft:itemGroup.name.monsterStoneEgg",
  "minecraft:itemGroup.name.mushroom",
  "minecraft:itemGroup.name.netherWartBlock",
  "minecraft:itemGroup.name.ominousBottle",
  "minecraft:itemGroup.name.ore",
  "minecraft:itemGroup.name.permission",
  "minecraft:itemGroup.name.pickaxe",
  "minecraft:itemGroup.name.planks",
  "minecraft:itemGroup.name.potion",
  "minecraft:itemGroup.name.potterySherds",
  "minecraft:itemGroup.name.pressurePlate",
  "minecraft:itemGroup.name.products",
  "minecraft:itemGroup.name.rail",
  "minecraft:itemGroup.name.rawFood",
  "minecraft:itemGroup.name.record",
  "minecraft:itemGroup.name.sandstone",
  "minecraft:itemGroup.name.sapling",
  "minecraft:itemGroup.name.sculk",
  "minecraft:itemGroup.name.seed",
  "minecraft:itemGroup.name.shovel",
  "minecraft:itemGroup.name.shulkerBox",
  "minecraft:itemGroup.name.sign",
  "minecraft:itemGroup.name.skull",
  "minecraft:itemGroup.name.slab",
  "minecraft:itemGroup.name.smithing_templates",
  "minecraft:itemGroup.name.splashPotion",
  "minecraft:itemGroup.name.stainedClay",
  "minecraft:itemGroup.name.stairs",
  "minecraft:itemGroup.name.stone",
  "minecraft:itemGroup.name.stoneBrick",
  "minecraft:itemGroup.name.sword",
  "minecraft:itemGroup.name.trapdoor",
  "minecraft:itemGroup.name.walls",
  "minecraft:itemGroup.name.wood",
  "minecraft:itemGroup.name.wool",
  "minecraft:itemGroup.name.woolCarpet"
];
var EnchantableSlots = {
  ArmorFeet: "armor_feet",
  ArmorTorso: "armor_torso",
  ArmorHead: "armor_head",
  ArmorLegs: "armor_legs",
  Axe: "axe",
  Bow: "bow",
  CosmeticHead: "cosmetic_head",
  Crossbow: "crossbow",
  Elytra: "elytra",
  FishingRod: "fishing_rod",
  Flintsteel: "flintsteel",
  Hoe: "hoe",
  Pickaxe: "pickaxe",
  Shears: "shears",
  Shield: "shield",
  Shovel: "shovel",
  Sword: "sword",
  All: "all"
};

// src/models/block.ts
var import_core = require("@swc/core");
var import_zod = require("zod");
var import_chalk2 = __toESM(require("chalk"));
var BlockComponentModel = {
  "minecraft:breathability": import_zod.z.enum(["solid", "air"]),
  "minecraft:breakonpush": import_zod.z.boolean(),
  "minecraft:buoyancy": import_zod.z.number(),
  "minecraft:collision_box": import_zod.z.union([
    import_zod.z.boolean(),
    import_zod.z.object({
      origin: import_zod.z.tuple([import_zod.z.number(), import_zod.z.number(), import_zod.z.number()]).optional(),
      size: import_zod.z.tuple([import_zod.z.number(), import_zod.z.number(), import_zod.z.number()]).optional()
    })
  ]),
  "minecraft:crafting_table": import_zod.z.object({
    crafting_tags: import_zod.z.array(import_zod.z.string()),
    table_name: import_zod.z.string().optional()
  }),
  "minecraft:creative_category": import_zod.z.object({
    parent: import_zod.z.string().optional()
  }),
  "minecraft:custom_components": import_zod.z.array(import_zod.z.string()),
  "minecraft:destructible_by_explosion": import_zod.z.union([
    import_zod.z.boolean(),
    import_zod.z.object({
      explosion_resistance: import_zod.z.number().optional()
    })
  ]),
  "minecraft:destructible_by_mining": import_zod.z.union([
    import_zod.z.boolean(),
    import_zod.z.object({
      seconds_to_destroy: import_zod.z.number().optional(),
      item_specific_speeds: import_zod.z.array(
        import_zod.z.object({
          item: import_zod.z.string(),
          destroy_speed: import_zod.z.number()
        })
      ).optional()
    })
  ]),
  "minecraft:destroy_time": import_zod.z.number(),
  "minecraft:destruction_particles": import_zod.z.object({
    texture: import_zod.z.string(),
    tint_method: import_zod.z.string().optional()
  }),
  "minecraft:display_name": import_zod.z.string(),
  "minecraft:entity_collision": import_zod.z.boolean(),
  "minecraft:explosion_resistance": import_zod.z.number(),
  "minecraft:flammable": import_zod.z.object({
    catch_chance_modifier: import_zod.z.number().optional(),
    destroy_chance_modifier: import_zod.z.number().optional()
  }),
  "minecraft:tick": import_zod.z.object({
    interval_range: import_zod.z.array(import_zod.z.number(), import_zod.z.number()),
    looping: import_zod.z.boolean().optional()
  }),
  "minecraft:friction": import_zod.z.number(),
  "minecraft:entity_fall_on": import_zod.z.object({
    min_fall_distance: import_zod.z.number().min(1)
  }),
  "minecraft:geometry": import_zod.z.string(),
  "minecraft:light_dampening": import_zod.z.number(),
  "minecraft:light_emission": import_zod.z.number(),
  "minecraft:loot": import_zod.z.string(),
  "minecraft:map_color": import_zod.z.string().regex(/^#[a-fA-F0-9]{6}$/),
  "minecraft:material_instances": import_zod.z.record(
    import_zod.z.object({
      texture: import_zod.z.string(),
      render_method: import_zod.z.string().optional()
      // Coloque z.nativeEnum(MaterialTypes) se tiver enum
    })
  ),
  "minecraft:pick_collision": import_zod.z.boolean(),
  "minecraft:placement_filter": import_zod.z.object({
    conditions: import_zod.z.array(
      import_zod.z.object({
        allowed_faces: import_zod.z.array(import_zod.z.string()).optional(),
        block_filter: import_zod.z.array(import_zod.z.string()).optional()
      })
    )
  }),
  "minecraft:pushable": import_zod.z.boolean(),
  "minecraft:random_ticking": import_zod.z.boolean(),
  "minecraft:rotation": import_zod.z.object({
    cardinal_direction: import_zod.z.boolean()
  }),
  "minecraft:transformation": import_zod.z.object({
    rotation: import_zod.z.tuple([import_zod.z.number(), import_zod.z.number(), import_zod.z.number()]).optional(),
    scale: import_zod.z.tuple([import_zod.z.number(), import_zod.z.number(), import_zod.z.number()]).optional(),
    translation: import_zod.z.tuple([import_zod.z.number(), import_zod.z.number(), import_zod.z.number()]).optional()
  }),
  "minecraft:unit_cube": import_zod.z.boolean(),
  "minecraft:unwalkable": import_zod.z.boolean()
};
var Block = class {
  constructor(identifier) {
    this.data = {
      format_version: "1.20.10",
      "minecraft:block": {
        description: {
          identifier
        },
        components: {
          "minecraft:custom_components": []
        }
      }
    };
    this.script = "";
    this.allevent = [""];
    return this;
  }
  setComponent(name, data) {
    const result = BlockComponentModel[name].safeParse(data);
    if (result.success) {
      this.data["minecraft:block"]["components"] = {
        ...this.data["minecraft:block"]["components"],
        [name]: data
      };
    } else {
      error(
        `${import_chalk2.default.blueBright(
          `(${this.data["minecraft:block"].description.identifier})`
        )} Error Component ${name}`,
        result.error.format()._errors[0]
      );
    }
    return this;
  }
  beforeOnPlayerPlace(calback) {
    if (this.allevent.includes("beforeOnPlayerPlace")) return this;
    this.allevent.push("beforeOnPlayerPlace");
    const id = this.data["minecraft:block"].description.identifier.split(":")[1] + ":beforeOnPlayerPlace";
    this.data["minecraft:block"].components["minecraft:custom_components"].push(
      id
    );
    this.script += `blockComponentRegistry.registerCustomComponent("${id}",{beforeOnPlayerPlace:${calback}});`;
    return this;
  }
  onEntityFallOn(calback) {
    if (this.allevent.includes("onEntityFallOn")) return this;
    this.allevent.push("onEntityFallOn");
    if (!this.data["minecraft:block"].components["minecraft:entity_fall_on"]?.min_fall_distance || Number(
      this.data["minecraft:block"].components["minecraft:entity_fall_on"]?.min_fall_distance
    ) > 0) {
      warn(
        `[${this.data["minecraft:block"].description.identifier}] Block Error Event [onEntityFallOn]`,
        `Need set component ${import_chalk2.default.blueBright(
          "entity_fall_on"
        )}
      .setComponent("minecraft:entity_fall_on", { min_fall_distance: 1 })`
      );
      return this;
    }
    const id = this.data["minecraft:block"].description.identifier.split(":")[1] + ":onEntityFallOn";
    this.data["minecraft:block"].components["minecraft:custom_components"].push(
      id
    );
    this.script += `blockComponentRegistry.registerCustomComponent("${id}",{onEntityFallOn:${calback}});`;
    return this;
  }
  onPlace(calback) {
    if (this.allevent.includes("onPlace")) return this;
    this.allevent.push("onPlace");
    const id = this.data["minecraft:block"].description.identifier.split(":")[1] + ":onPlace";
    this.data["minecraft:block"].components["minecraft:custom_components"].push(
      id
    );
    this.script += `blockComponentRegistry.registerCustomComponent("${id}",{onPlace:${calback}});`;
    return this;
  }
  onPlayerDestroy(calback) {
    if (this.allevent.includes("onPlayerDestroy")) return this;
    this.allevent.push("onPlayerDestroy");
    const id = this.data["minecraft:block"].description.identifier.split(":")[1] + ":onPlayerDestroy";
    this.data["minecraft:block"].components["minecraft:custom_components"].push(
      id
    );
    this.script += `blockComponentRegistry.registerCustomComponent("${id}",{onPlayerDestroy:${calback}});`;
    return this;
  }
  onPlayerInteract(calback) {
    if (this.allevent.includes("onPlayerInteract")) return this;
    this.allevent.push("onPlayerInteract");
    const id = this.data["minecraft:block"].description.identifier.split(":")[1] + ":onPlayerInteract";
    this.data["minecraft:block"].components["minecraft:custom_components"].push(
      id
    );
    this.script += `blockComponentRegistry.registerCustomComponent("${id}",{onPlayerInteract:${calback}});`;
    return this;
  }
  onRandomTick(calback) {
    if (this.allevent.includes("onRandomTick")) return this;
    this.allevent.push("onRandomTick");
    const id = this.data["minecraft:block"].description.identifier.split(":")[1] + ":onRandomTick";
    this.data["minecraft:block"].components["minecraft:custom_components"].push(
      id
    );
    this.script += `blockComponentRegistry.registerCustomComponent("${id}",{onRandomTick:${calback}});`;
    return this;
  }
  onStepOff(calback) {
    if (this.allevent.includes("onStepOff")) return this;
    this.allevent.push("onStepOff");
    const id = this.data["minecraft:block"].description.identifier.split(":")[1] + ":onStepOff";
    this.data["minecraft:block"].components["minecraft:custom_components"].push(
      id
    );
    this.script += `blockComponentRegistry.registerCustomComponent("${id}",{onStepOff:${calback}});`;
    return this;
  }
  onStepOn(calback) {
    if (this.allevent.includes("onStepOn")) return this;
    this.allevent.push("onStepOn");
    const id = this.data["minecraft:block"].description.identifier.split(":")[1] + ":onStepOn";
    this.data["minecraft:block"].components["minecraft:custom_components"].push(
      id
    );
    this.script += `blockComponentRegistry.registerCustomComponent("${id}",{onStepOn:${calback}});`;
    return this;
  }
  onTick(calback) {
    if (this.allevent.includes("onTick")) return this;
    this.allevent.push("onTick");
    if (!this.data["minecraft:block"].components["minecraft:tick"]?.interval_range) {
      warn(
        `[${this.data["minecraft:block"].description.identifier}] Block Error Event [onTick]`,
        `Need set component ${import_chalk2.default.blueBright(
          "minecraft:tick"
        )}
      .setComponent("minecraft:tick", { interval_range: [10, 10] })`
      );
      return this;
    }
    const id = this.data["minecraft:block"].description.identifier.split(":")[1] + ":onTick";
    this.data["minecraft:block"].components["minecraft:custom_components"].push(
      id
    );
    this.script += `blockComponentRegistry.registerCustomComponent("${id}",{onTick:${calback}});`;
    return this;
  }
  toJSON() {
    let output = (0, import_core.transformSync)(this.script, {
      sourceMaps: false,
      isModule: true,
      minify: true,
      jsc: {
        minify: {
          compress: {
            passes: 3,
            dead_code: true,
            drop_debugger: true,
            reduce_vars: true,
            collapse_vars: true
          },
          mangle: {
            toplevel: true
          }
        },
        parser: {
          syntax: "ecmascript"
        },
        transform: {}
      }
    });
    this.script = output.code;
    return this;
  }
};

// src/models/item.ts
var import_core2 = require("@swc/core");
var import_zod2 = require("zod");
var import_chalk3 = __toESM(require("chalk"));
var ItemComponentModel = {
  "minecraft:allow_off_hand": import_zod2.z.boolean(),
  "minecraft:armor": import_zod2.z.object({
    protection: import_zod2.z.number(),
    texture_type: import_zod2.z.string().optional()
  }),
  "minecraft:block_placer": import_zod2.z.object({
    block: import_zod2.z.string(),
    use_on: import_zod2.z.array(import_zod2.z.string()).optional()
  }),
  "minecraft:can_destroy_in_creative": import_zod2.z.boolean(),
  "minecraft:cooldown": import_zod2.z.object({
    category: import_zod2.z.string(),
    duration: import_zod2.z.number()
  }),
  "minecraft:creative_category": import_zod2.z.object({
    category: import_zod2.z.enum(["construction", "equipment", "items", "nature", "none"]),
    group: import_zod2.z.enum(MinecraftItemGroupsArray)
  }),
  "minecraft:damage": import_zod2.z.object({
    value: import_zod2.z.number(),
    max: import_zod2.z.number().optional()
  }),
  "minecraft:digger": import_zod2.z.object({
    use_efficiency: import_zod2.z.boolean(),
    destroy_speeds: import_zod2.z.array(
      import_zod2.z.object({
        block: import_zod2.z.string(),
        speed: import_zod2.z.number(),
        on_dig: import_zod2.z.object({
          event: import_zod2.z.string(),
          target: import_zod2.z.enum(["self", "block"]).optional()
        }).optional()
      })
    )
  }),
  "minecraft:display_name": import_zod2.z.object({
    value: import_zod2.z.string()
  }),
  "minecraft:durability": import_zod2.z.object({
    max_durability: import_zod2.z.number(),
    damage_chance: import_zod2.z.object({
      max: import_zod2.z.number(),
      min: import_zod2.z.number()
    }).optional()
  }),
  "minecraft:dye_powder": import_zod2.z.object({
    color: import_zod2.z.number()
  }),
  "minecraft:enchantable": import_zod2.z.object({
    slot: import_zod2.z.enum(
      Object.keys(EnchantableSlots)
    ),
    value: import_zod2.z.number().min(0)
  }),
  "minecraft:entity_placer": import_zod2.z.object({
    entity: import_zod2.z.string(),
    dispense_on: import_zod2.z.array(import_zod2.z.string()).optional()
  }),
  "minecraft:explodable": import_zod2.z.boolean(),
  "minecraft:food": import_zod2.z.object({
    nutrition: import_zod2.z.number(),
    saturation_modifier: import_zod2.z.number(),
    can_always_eat: import_zod2.z.boolean().optional(),
    effects: import_zod2.z.array(
      import_zod2.z.object({
        effect: import_zod2.z.string(),
        chance: import_zod2.z.number(),
        duration: import_zod2.z.number(),
        amplifier: import_zod2.z.number().optional()
      })
    ).optional(),
    remove_effects: import_zod2.z.array(import_zod2.z.string()).optional(),
    using_converts_to: import_zod2.z.string().optional()
  }),
  "minecraft:fuel": import_zod2.z.object({
    duration: import_zod2.z.number().optional(),
    burn_time: import_zod2.z.number().optional()
  }),
  "minecraft:hand_equipped": import_zod2.z.boolean(),
  "minecraft:icon": import_zod2.z.object({
    texture: import_zod2.z.string(),
    frame: import_zod2.z.number().optional(),
    frame_count: import_zod2.z.number().optional()
  }),
  "minecraft:ignores_permission": import_zod2.z.boolean(),
  "minecraft:knockback_resistance": import_zod2.z.object({
    value: import_zod2.z.number()
  }),
  "minecraft:max_stack_size": import_zod2.z.number(),
  "minecraft:mining_speed": import_zod2.z.number(),
  "minecraft:mirrored_art": import_zod2.z.boolean(),
  "minecraft:on_use_on": import_zod2.z.object({
    event: import_zod2.z.string(),
    target: import_zod2.z.enum(["self", "block"])
  }),
  "minecraft:projectile": import_zod2.z.object({
    projectile_entity: import_zod2.z.string(),
    minimum_critical_power: import_zod2.z.number().optional(),
    power: import_zod2.z.number().optional(),
    inaccuracy: import_zod2.z.number().optional(),
    shoot_sound: import_zod2.z.string().optional()
  }),
  "minecraft:render_offsets": import_zod2.z.object({
    main_hand: import_zod2.z.any().optional(),
    off_hand: import_zod2.z.any().optional()
  }),
  "minecraft:repairable": import_zod2.z.object({
    repair_items: import_zod2.z.array(import_zod2.z.string()),
    repair_item_tags: import_zod2.z.array(import_zod2.z.string()).optional()
  }),
  "minecraft:requires_interact": import_zod2.z.boolean(),
  "minecraft:shooter": import_zod2.z.object({
    projectile: import_zod2.z.string(),
    count: import_zod2.z.number().optional(),
    charge_on_draw: import_zod2.z.boolean().optional()
  }),
  "minecraft:stacked_by_data": import_zod2.z.boolean(),
  "minecraft:throwable": import_zod2.z.object({
    do_swing_animation: import_zod2.z.boolean().optional(),
    launch_power_scale: import_zod2.z.number().optional()
  }),
  "minecraft:use_duration": import_zod2.z.number(),
  "minecraft:weapon": import_zod2.z.object({
    on_hit_block: import_zod2.z.string().optional(),
    on_hurt_entity: import_zod2.z.string().optional()
  }),
  // Additional components you had in your model but not in the names list
  "minecraft:glint": import_zod2.z.boolean(),
  "minecraft:hover_text_color": import_zod2.z.string(),
  "minecraft:wearable": import_zod2.z.object({
    slot: import_zod2.z.enum([
      "armor",
      "chest",
      "feet",
      "head",
      "legs",
      "offhand",
      "mainhand"
    ]),
    protection: import_zod2.z.number().optional(),
    texture_type: import_zod2.z.string().optional()
  }),
  "minecraft:record": import_zod2.z.object({
    sound: import_zod2.z.string(),
    comparator_signal: import_zod2.z.number().optional()
  }),
  "minecraft:use_animation": import_zod2.z.enum([
    "eat",
    "drink",
    "block",
    "bow",
    "spear",
    "crossbow",
    "camera"
  ]),
  "minecraft:tags": import_zod2.z.array(import_zod2.z.string())
};
var Item = class {
  constructor(identifier) {
    this.data = {
      format_version: "1.21.70",
      "minecraft:item": {
        description: {
          identifier,
          menu_category: {
            category: "items"
          }
        },
        components: {
          "minecraft:custom_components": []
        }
      }
    };
    this.script = "";
    this.allevent = [""];
    return this;
  }
  setComponent(name, data) {
    const result = ItemComponentModel[name].safeParse(data);
    if (result.success) {
      if (name === "minecraft:enchantable") {
        this.data["minecraft:item"]["components"] = {
          ...this.data["minecraft:item"]["components"],
          [name]: JSON.parse(JSON.stringify(data).toLowerCase())
        };
      } else if (name === "minecraft:creative_category") {
        this.data["minecraft:item"]["description"]["menu_category"] = data;
      } else
        this.data["minecraft:item"]["components"] = {
          ...this.data["minecraft:item"]["components"],
          [name]: data
        };
    } else {
      error(
        `${import_chalk3.default.blueBright(
          `(${this.data["minecraft:item"].description.identifier})`
        )} Error Component ${name}`,
        result.error.errors[0].message
      );
    }
    return this;
  }
  onBeforeDurabilityDamage(calback) {
    const eventName = "onBeforeDurabilityDamage";
    if (this.allevent.includes(eventName)) return this;
    this.allevent.push(eventName);
    const id = `${this.data["minecraft:item"].description.identifier.split(":")[1]}:${eventName}`;
    this.data["minecraft:item"].components["minecraft:custom_components"].push(
      id
    );
    this.script += `itemComponentRegistry.registerCustomComponent("${id}",{${eventName}:${calback}});`;
    return this;
  }
  onConsume(calback) {
    if (this.allevent.includes("onConsume")) return this;
    this.allevent.push("onConsume");
    const id = this.data["minecraft:item"].description.identifier.split(":")[1] + ":onConsume";
    this.data["minecraft:item"].components["minecraft:custom_components"].push(
      id
    );
    this.script += `itemComponentRegistry.registerCustomComponent("${id}",{onConsume:${calback}});`;
    return this;
  }
  onCompleteUse(calback) {
    const eventName = "onCompleteUse";
    if (this.allevent.includes(eventName)) return this;
    this.allevent.push(eventName);
    const id = `${this.data["minecraft:item"].description.identifier.split(":")[1]}:${eventName}`;
    this.data["minecraft:item"].components["minecraft:custom_components"].push(
      id
    );
    this.script += `itemComponentRegistry.registerCustomComponent("${id}",{${eventName}:${calback}});`;
    return this;
  }
  onHitEntity(calback) {
    const eventName = "onHitEntity";
    if (this.allevent.includes(eventName)) return this;
    this.allevent.push(eventName);
    const id = `${this.data["minecraft:item"].description.identifier.split(":")[1]}:${eventName}`;
    this.data["minecraft:item"].components["minecraft:custom_components"].push(
      id
    );
    this.script += `itemComponentRegistry.registerCustomComponent("${id}",{${eventName}:${calback}});`;
    return this;
  }
  onMineBlock(calback) {
    const eventName = "onMineBlock";
    if (this.allevent.includes(eventName)) return this;
    this.allevent.push(eventName);
    const id = `${this.data["minecraft:item"].description.identifier.split(":")[1]}:${eventName}`;
    this.data["minecraft:item"].components["minecraft:custom_components"].push(
      id
    );
    this.script += `itemComponentRegistry.registerCustomComponent("${id}",{${eventName}:${calback}});`;
    return this;
  }
  onUse(calback) {
    const eventName = "onUse";
    if (this.allevent.includes(eventName)) return this;
    this.allevent.push(eventName);
    const id = `${this.data["minecraft:item"].description.identifier.split(":")[1]}:${eventName}`;
    this.data["minecraft:item"].components["minecraft:custom_components"].push(
      id
    );
    this.script += `itemComponentRegistry.registerCustomComponent("${id}",{${eventName}:${calback}});`;
    return this;
  }
  onUseOn(calback) {
    const eventName = "onUse";
    if (this.allevent.includes(eventName)) return this;
    this.allevent.push(eventName);
    const id = `${this.data["minecraft:item"].description.identifier.split(":")[1]}:${eventName}`;
    this.data["minecraft:item"].components["minecraft:custom_components"].push(
      id
    );
    this.script += `itemComponentRegistry.registerCustomComponent("${id}",{${eventName}:${calback}});`;
    return this;
  }
  toJSON() {
    let output = (0, import_core2.transformSync)(this.script, {
      sourceMaps: false,
      isModule: true,
      minify: true,
      jsc: {
        minify: {
          compress: {
            passes: 3,
            dead_code: true,
            drop_debugger: true,
            reduce_vars: true,
            collapse_vars: true
          },
          mangle: {
            toplevel: true
          }
        },
        parser: {
          syntax: "ecmascript"
        },
        transform: {}
      }
    });
    this.script = output.code;
    return this;
  }
};

// src/samples/sword.ts
var Sword = class extends Item {
  constructor(identifier) {
    super(identifier);
    this.setComponent("minecraft:hand_equipped", true);
    this.setComponent("minecraft:enchantable", {
      slot: "Sword",
      value: 10
    });
    this.setComponent("minecraft:creative_category", {
      category: "items",
      group: "minecraft:itemGroup.name.sword"
    });
    return this;
  }
  setDamage(damage) {
    this.setComponent("minecraft:damage", { value: damage });
    return this;
  }
};

// src/index.ts
var import_chalk4 = __toESM(require("chalk"));
var import_os = require("os");
var baseDir = (0, import_os.platform)() === "linux" ? `/home/${(0, import_os.userInfo)().username}/.local/share/mcpelauncher/games/com.mojang` : `C:\\Users\\${(0, import_os.userInfo)().username}\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang`;
var blockIds = [];
var startTime = Date.now();
console.log(import_chalk4.default.bgGreenBright.black(" MCBE ") + " Starting build...");
var Addon = class {
  constructor({ name, description }) {
    this.allScript = "";
    this.resDir = baseDir + `/development_resource_packs/${name} RE`;
    this.behDir = baseDir + `/development_behavior_packs/${name} BE`;
    isExistRoute(this.behDir + "/blocks/");
    isExistRoute(this.resDir);
    CreateManifest({
      behDir: this.behDir,
      resDir: this.resDir,
      name,
      description
    });
    return this;
  }
  addBlocks(blocks) {
    for (const block of blocks) {
      const identifier = block.data["minecraft:block"].description.identifier;
      if (!blockIds.includes(identifier)) blockIds.push(identifier);
      else return this;
      (0, import_fs2.writeFileSync)(
        this.behDir + "/blocks/" + identifier.split(":")[1] + ".json",
        JSON.stringify(block.data)
      );
      this.allScript += block.script;
    }
    console.log(
      import_chalk4.default.bgBlue(" MCBE ") + ` Build sucess all blocks to ${parseFloat(
        ((Date.now() - startTime) / 60).toString().slice(0, 4)
      )} s`
    );
    return this;
  }
  addItems(items) {
    for (const item of items) {
      const identifier = item.data["minecraft:item"].description.identifier;
      if (!blockIds.includes(identifier)) blockIds.push(identifier);
      else return this;
      (0, import_fs2.writeFileSync)(
        this.behDir + "/blocks/" + identifier.split(":")[1] + ".json",
        JSON.stringify(item.data)
      );
      this.allScript += item.script;
    }
    console.log(
      import_chalk4.default.bgBlue(" MCBE ") + ` Build sucess all items to ${parseFloat(
        ((Date.now() - startTime) / 60).toString().slice(0, 4)
      )} s`
    );
    return this;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Addon,
  Block,
  Item,
  Sword
});
//# sourceMappingURL=index.js.map