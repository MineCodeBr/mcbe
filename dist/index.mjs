// src/index.ts
import { writeFileSync as writeFileSync2 } from "fs";

// src/utils.ts
import chalk from "chalk";
import { randomUUID } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
var warn = (arg, arg2) => console.warn(
  `${chalk.white.bgYellow.black(" MCBE ")} ${arg}${arg2 ? `
     > ${chalk.gray(arg2)}` : ""}`
);
var error = (arg, arg2) => {
  console.error(
    `${chalk.bgRed.black(" MCBE ")} ${arg}${arg2 ? `
     > ${chalk.gray(arg2)}` : ""}`
  );
};
var isExistRoute = (path) => {
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
};
function CreateManifest({
  behDir,
  resDir,
  name,
  description
}) {
  let manifestBehavior = existsSync(behDir + "/manifest.json") ? JSON.parse(readFileSync(behDir + "/manifest.json")) : randomUUID();
  let manifestResource = existsSync(resDir + "/manifest.json") ? JSON.parse(readFileSync(resDir + "/manifest.json")) : randomUUID();
  const devUuid = manifestBehavior["header"] ? manifestBehavior["header"]["uuid"] : manifestBehavior;
  writeFileSync(
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
  writeFileSync(
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
import { transformSync } from "@swc/core";
import { z } from "zod";
import chalk2 from "chalk";
var BlockComponentModel = {
  "minecraft:breathability": z.enum(["solid", "air"]),
  "minecraft:breakonpush": z.boolean(),
  "minecraft:buoyancy": z.number(),
  "minecraft:collision_box": z.union([
    z.boolean(),
    z.object({
      origin: z.tuple([z.number(), z.number(), z.number()]).optional(),
      size: z.tuple([z.number(), z.number(), z.number()]).optional()
    })
  ]),
  "minecraft:crafting_table": z.object({
    crafting_tags: z.array(z.string()),
    table_name: z.string().optional()
  }),
  "minecraft:creative_category": z.object({
    parent: z.string().optional()
  }),
  "minecraft:custom_components": z.array(z.string()),
  "minecraft:destructible_by_explosion": z.union([
    z.boolean(),
    z.object({
      explosion_resistance: z.number().optional()
    })
  ]),
  "minecraft:destructible_by_mining": z.union([
    z.boolean(),
    z.object({
      seconds_to_destroy: z.number().optional(),
      item_specific_speeds: z.array(
        z.object({
          item: z.string(),
          destroy_speed: z.number()
        })
      ).optional()
    })
  ]),
  "minecraft:destroy_time": z.number(),
  "minecraft:destruction_particles": z.object({
    texture: z.string(),
    tint_method: z.string().optional()
  }),
  "minecraft:display_name": z.string(),
  "minecraft:entity_collision": z.boolean(),
  "minecraft:explosion_resistance": z.number(),
  "minecraft:flammable": z.object({
    catch_chance_modifier: z.number().optional(),
    destroy_chance_modifier: z.number().optional()
  }),
  "minecraft:tick": z.object({
    interval_range: z.array(z.number(), z.number()),
    looping: z.boolean().optional()
  }),
  "minecraft:friction": z.number(),
  "minecraft:entity_fall_on": z.object({
    min_fall_distance: z.number().min(1)
  }),
  "minecraft:geometry": z.string(),
  "minecraft:light_dampening": z.number(),
  "minecraft:light_emission": z.number(),
  "minecraft:loot": z.string(),
  "minecraft:map_color": z.string().regex(/^#[a-fA-F0-9]{6}$/),
  "minecraft:material_instances": z.record(
    z.object({
      texture: z.string(),
      render_method: z.string().optional()
      // Coloque z.nativeEnum(MaterialTypes) se tiver enum
    })
  ),
  "minecraft:pick_collision": z.boolean(),
  "minecraft:placement_filter": z.object({
    conditions: z.array(
      z.object({
        allowed_faces: z.array(z.string()).optional(),
        block_filter: z.array(z.string()).optional()
      })
    )
  }),
  "minecraft:pushable": z.boolean(),
  "minecraft:random_ticking": z.boolean(),
  "minecraft:rotation": z.object({
    cardinal_direction: z.boolean()
  }),
  "minecraft:transformation": z.object({
    rotation: z.tuple([z.number(), z.number(), z.number()]).optional(),
    scale: z.tuple([z.number(), z.number(), z.number()]).optional(),
    translation: z.tuple([z.number(), z.number(), z.number()]).optional()
  }),
  "minecraft:unit_cube": z.boolean(),
  "minecraft:unwalkable": z.boolean()
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
        `${chalk2.blueBright(
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
        `Need set component ${chalk2.blueBright(
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
        `Need set component ${chalk2.blueBright(
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
    let output = transformSync(this.script, {
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
import { transformSync as transformSync2 } from "@swc/core";
import { z as z2 } from "zod";
import chalk3 from "chalk";
var ItemComponentModel = {
  "minecraft:allow_off_hand": z2.boolean(),
  "minecraft:armor": z2.object({
    protection: z2.number(),
    texture_type: z2.string().optional()
  }),
  "minecraft:block_placer": z2.object({
    block: z2.string(),
    use_on: z2.array(z2.string()).optional()
  }),
  "minecraft:can_destroy_in_creative": z2.boolean(),
  "minecraft:cooldown": z2.object({
    category: z2.string(),
    duration: z2.number()
  }),
  "minecraft:creative_category": z2.object({
    category: z2.enum(["construction", "equipment", "items", "nature", "none"]),
    group: z2.enum(MinecraftItemGroupsArray)
  }),
  "minecraft:damage": z2.object({
    value: z2.number(),
    max: z2.number().optional()
  }),
  "minecraft:digger": z2.object({
    use_efficiency: z2.boolean(),
    destroy_speeds: z2.array(
      z2.object({
        block: z2.string(),
        speed: z2.number(),
        on_dig: z2.object({
          event: z2.string(),
          target: z2.enum(["self", "block"]).optional()
        }).optional()
      })
    )
  }),
  "minecraft:display_name": z2.object({
    value: z2.string()
  }),
  "minecraft:durability": z2.object({
    max_durability: z2.number(),
    damage_chance: z2.object({
      max: z2.number(),
      min: z2.number()
    }).optional()
  }),
  "minecraft:dye_powder": z2.object({
    color: z2.number()
  }),
  "minecraft:enchantable": z2.object({
    slot: z2.enum(
      Object.keys(EnchantableSlots)
    ),
    value: z2.number().min(0)
  }),
  "minecraft:entity_placer": z2.object({
    entity: z2.string(),
    dispense_on: z2.array(z2.string()).optional()
  }),
  "minecraft:explodable": z2.boolean(),
  "minecraft:food": z2.object({
    nutrition: z2.number(),
    saturation_modifier: z2.number(),
    can_always_eat: z2.boolean().optional(),
    effects: z2.array(
      z2.object({
        effect: z2.string(),
        chance: z2.number(),
        duration: z2.number(),
        amplifier: z2.number().optional()
      })
    ).optional(),
    remove_effects: z2.array(z2.string()).optional(),
    using_converts_to: z2.string().optional()
  }),
  "minecraft:fuel": z2.object({
    duration: z2.number().optional(),
    burn_time: z2.number().optional()
  }),
  "minecraft:hand_equipped": z2.boolean(),
  "minecraft:icon": z2.object({
    texture: z2.string(),
    frame: z2.number().optional(),
    frame_count: z2.number().optional()
  }),
  "minecraft:ignores_permission": z2.boolean(),
  "minecraft:knockback_resistance": z2.object({
    value: z2.number()
  }),
  "minecraft:max_stack_size": z2.number(),
  "minecraft:mining_speed": z2.number(),
  "minecraft:mirrored_art": z2.boolean(),
  "minecraft:on_use_on": z2.object({
    event: z2.string(),
    target: z2.enum(["self", "block"])
  }),
  "minecraft:projectile": z2.object({
    projectile_entity: z2.string(),
    minimum_critical_power: z2.number().optional(),
    power: z2.number().optional(),
    inaccuracy: z2.number().optional(),
    shoot_sound: z2.string().optional()
  }),
  "minecraft:render_offsets": z2.object({
    main_hand: z2.any().optional(),
    off_hand: z2.any().optional()
  }),
  "minecraft:repairable": z2.object({
    repair_items: z2.array(z2.string()),
    repair_item_tags: z2.array(z2.string()).optional()
  }),
  "minecraft:requires_interact": z2.boolean(),
  "minecraft:shooter": z2.object({
    projectile: z2.string(),
    count: z2.number().optional(),
    charge_on_draw: z2.boolean().optional()
  }),
  "minecraft:stacked_by_data": z2.boolean(),
  "minecraft:throwable": z2.object({
    do_swing_animation: z2.boolean().optional(),
    launch_power_scale: z2.number().optional()
  }),
  "minecraft:use_duration": z2.number(),
  "minecraft:weapon": z2.object({
    on_hit_block: z2.string().optional(),
    on_hurt_entity: z2.string().optional()
  }),
  // Additional components you had in your model but not in the names list
  "minecraft:glint": z2.boolean(),
  "minecraft:hover_text_color": z2.string(),
  "minecraft:wearable": z2.object({
    slot: z2.enum([
      "armor",
      "chest",
      "feet",
      "head",
      "legs",
      "offhand",
      "mainhand"
    ]),
    protection: z2.number().optional(),
    texture_type: z2.string().optional()
  }),
  "minecraft:record": z2.object({
    sound: z2.string(),
    comparator_signal: z2.number().optional()
  }),
  "minecraft:use_animation": z2.enum([
    "eat",
    "drink",
    "block",
    "bow",
    "spear",
    "crossbow",
    "camera"
  ]),
  "minecraft:tags": z2.array(z2.string())
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
        `${chalk3.blueBright(
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
    let output = transformSync2(this.script, {
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
import chalk4 from "chalk";
import { platform, userInfo } from "os";
var baseDir = platform() === "linux" ? `/home/${userInfo().username}/.local/share/mcpelauncher/games/com.mojang` : `C:\\Users\\${userInfo().username}\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang`;
var blockIds = [];
var startTime = Date.now();
console.log(chalk4.bgGreenBright.black(" MCBE ") + " Starting build...");
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
      writeFileSync2(
        this.behDir + "/blocks/" + identifier.split(":")[1] + ".json",
        JSON.stringify(block.data)
      );
      this.allScript += block.script;
    }
    console.log(
      chalk4.bgBlue(" MCBE ") + ` Build sucess all blocks to ${parseFloat(
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
      writeFileSync2(
        this.behDir + "/blocks/" + identifier.split(":")[1] + ".json",
        JSON.stringify(item.data)
      );
      this.allScript += item.script;
    }
    console.log(
      chalk4.bgBlue(" MCBE ") + ` Build sucess all items to ${parseFloat(
        ((Date.now() - startTime) / 60).toString().slice(0, 4)
      )} s`
    );
    return this;
  }
};
export {
  Addon,
  Block,
  Item,
  Sword
};
//# sourceMappingURL=index.mjs.map