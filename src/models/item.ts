import { transformSync } from "@swc/core";
import { Category, ItemBase } from "../../types";
import { z } from "zod";
import chalk from "chalk";
import { error, EnchantableSlots, MinecraftItemGroupsArray } from "../utils";
import {
  BlockTypes,
  ItemComponentCompleteUseEvent,
  ItemComponentConsumeEvent,
  ItemComponentHitEntityEvent,
  ItemComponentMineBlockEvent,
  ItemComponentUseEvent,
  ItemComponentUseOnEvent,
} from "@minecraft/server";

export const ItemComponentModel = {
  "minecraft:allow_off_hand": z.boolean(),
  "minecraft:armor": z.object({
    protection: z.number(),
    texture_type: z.string().optional(),
  }),
  "minecraft:block_placer": z.object({
    block: z.string(),
    use_on: z.array(z.string()).optional(),
  }),
  "minecraft:can_destroy_in_creative": z.boolean(),
  "minecraft:cooldown": z.object({
    category: z.string(),
    duration: z.number(),
  }),
  "minecraft:creative_category": z.object({
    category: z.enum(["construction", "equipment", "items", "nature", "none"]),
    group: z.enum(MinecraftItemGroupsArray),
  }),
  "minecraft:damage": z.object({
    value: z.number(),
    max: z.number().optional(),
  }),
  "minecraft:digger": z.object({
    use_efficiency: z.boolean(),
    destroy_speeds: z.array(
      z.object({
        block: z.string(),
        speed: z.number(),
        on_dig: z
          .object({
            event: z.string(),
            target: z.enum(["self", "block"]).optional(),
          })
          .optional(),
      })
    ),
  }),
  "minecraft:display_name": z.object({
    value: z.string(),
  }),
  "minecraft:durability": z.object({
    max_durability: z.number(),
    damage_chance: z
      .object({
        max: z.number(),
        min: z.number(),
      })
      .optional(),
  }),
  "minecraft:dye_powder": z.object({
    color: z.number(),
  }),
  "minecraft:enchantable": z.object({
    slot: z.enum(
      Object.keys(EnchantableSlots) as [keyof typeof EnchantableSlots]
    ),
    value: z.number().min(0),
  }),
  "minecraft:entity_placer": z.object({
    entity: z.string(),
    dispense_on: z.array(z.string()).optional(),
  }),
  "minecraft:explodable": z.boolean(),
  "minecraft:food": z.object({
    nutrition: z.number(),
    saturation_modifier: z.number(),
    can_always_eat: z.boolean().optional(),
    effects: z
      .array(
        z.object({
          effect: z.string(),
          chance: z.number(),
          duration: z.number(),
          amplifier: z.number().optional(),
        })
      )
      .optional(),
    remove_effects: z.array(z.string()).optional(),
    using_converts_to: z.string().optional(),
  }),
  "minecraft:fuel": z.object({
    duration: z.number().optional(),
    burn_time: z.number().optional(),
  }),
  "minecraft:hand_equipped": z.boolean(),
  "minecraft:icon": z.object({
    texture: z.string(),
    frame: z.number().optional(),
    frame_count: z.number().optional(),
  }),
  "minecraft:ignores_permission": z.boolean(),
  "minecraft:knockback_resistance": z.object({
    value: z.number(),
  }),
  "minecraft:max_stack_size": z.number(),
  "minecraft:mining_speed": z.number(),
  "minecraft:mirrored_art": z.boolean(),
  "minecraft:on_use_on": z.object({
    event: z.string(),
    target: z.enum(["self", "block"]),
  }),
  "minecraft:projectile": z.object({
    projectile_entity: z.string(),
    minimum_critical_power: z.number().optional(),
    power: z.number().optional(),
    inaccuracy: z.number().optional(),
    shoot_sound: z.string().optional(),
  }),
  "minecraft:render_offsets": z.object({
    main_hand: z.any().optional(),
    off_hand: z.any().optional(),
  }),
  "minecraft:repairable": z.object({
    repair_items: z.array(z.string()),
    repair_item_tags: z.array(z.string()).optional(),
  }),
  "minecraft:requires_interact": z.boolean(),
  "minecraft:shooter": z.object({
    projectile: z.string(),
    count: z.number().optional(),
    charge_on_draw: z.boolean().optional(),
  }),
  "minecraft:stacked_by_data": z.boolean(),
  "minecraft:throwable": z.object({
    do_swing_animation: z.boolean().optional(),
    launch_power_scale: z.number().optional(),
  }),
  "minecraft:use_duration": z.number(),
  "minecraft:weapon": z.object({
    on_hit_block: z.string().optional(),
    on_hurt_entity: z.string().optional(),
  }),
  // Additional components you had in your model but not in the names list
  "minecraft:glint": z.boolean(),
  "minecraft:hover_text_color": z.string(),
  "minecraft:wearable": z.object({
    slot: z.enum([
      "armor",
      "chest",
      "feet",
      "head",
      "legs",
      "offhand",
      "mainhand",
    ]),
    protection: z.number().optional(),
    texture_type: z.string().optional(),
  }),
  "minecraft:record": z.object({
    sound: z.string(),
    comparator_signal: z.number().optional(),
  }),
  "minecraft:use_animation": z.enum([
    "eat",
    "drink",
    "block",
    "bow",
    "spear",
    "crossbow",
    "camera",
  ]),
  "minecraft:tags": z.array(z.string()),
};

export default class Item {
  data: ItemBase;
  script: string;
  allevent: string[];
  constructor(identifier: `${string}:${string}`) {
    this.data = {
      format_version: "1.21.70",
      "minecraft:item": {
        description: {
          identifier: identifier,
          menu_category: {
            category: "items",
          },
        },
        components: {
          "minecraft:custom_components": [],
        },
      },
    };

    this.script = "";
    this.allevent = [""];
    return this;
  }

  setComponent<T extends keyof typeof ItemComponentModel>(
    name: T,
    data: T extends keyof typeof ItemComponentModel
      ? z.infer<(typeof ItemComponentModel)[T]>
      : never
  ) {
    const result = ItemComponentModel[name].safeParse(data);
    if (result.success) {
      if (name === "minecraft:enchantable") {
        this.data["minecraft:item"]["components"] = {
          ...this.data["minecraft:item"]["components"],
          [name]: JSON.parse(JSON.stringify(data).toLowerCase()),
        };
      } else if (name === "minecraft:creative_category") {
        this.data["minecraft:item"]["description"]["menu_category"] = data as {
          category: Category;
        };
      } else
        this.data["minecraft:item"]["components"] = {
          ...this.data["minecraft:item"]["components"],
          [name]: data,
        };
    } else {
      error(
        `${chalk.blueBright(
          `(${this.data["minecraft:item"].description.identifier})`
        )} Error Component ${name}`,
        result.error.errors[0].message
      );
    }
    return this;
  }

  onBeforeDurabilityDamage(calback: (arg: ItemComponentConsumeEvent) => void) {
    const eventName = "onBeforeDurabilityDamage";
    if (this.allevent.includes(eventName)) return this;
    this.allevent.push(eventName);
    const id = `${
      this.data["minecraft:item"].description.identifier.split(":")[1]
    }:${eventName}`;

    this.data["minecraft:item"].components["minecraft:custom_components"].push(
      id
    );

    this.script += `itemComponentRegistry.registerCustomComponent("${id}",{${eventName}:${calback}});`;

    return this;
  }

  onConsume(calback: (arg: ItemComponentConsumeEvent) => void) {
    if (this.allevent.includes("onConsume")) return this;
    this.allevent.push("onConsume");
    const id =
      this.data["minecraft:item"].description.identifier.split(":")[1] +
      ":onConsume";

    this.data["minecraft:item"].components["minecraft:custom_components"].push(
      id
    );

    this.script += `itemComponentRegistry.registerCustomComponent("${id}",{onConsume:${calback}});`;

    return this;
  }

  onCompleteUse(calback: (arg: ItemComponentCompleteUseEvent) => void) {
    const eventName = "onCompleteUse";
    if (this.allevent.includes(eventName)) return this;
    this.allevent.push(eventName);
    const id = `${
      this.data["minecraft:item"].description.identifier.split(":")[1]
    }:${eventName}`;

    this.data["minecraft:item"].components["minecraft:custom_components"].push(
      id
    );

    this.script += `itemComponentRegistry.registerCustomComponent("${id}",{${eventName}:${calback}});`;

    return this;
  }

  onHitEntity(calback: (arg: ItemComponentHitEntityEvent) => void) {
    const eventName = "onHitEntity";
    if (this.allevent.includes(eventName)) return this;
    this.allevent.push(eventName);
    const id = `${
      this.data["minecraft:item"].description.identifier.split(":")[1]
    }:${eventName}`;

    this.data["minecraft:item"].components["minecraft:custom_components"].push(
      id
    );

    this.script += `itemComponentRegistry.registerCustomComponent("${id}",{${eventName}:${calback}});`;

    return this;
  }

  onMineBlock(calback: (arg: ItemComponentMineBlockEvent) => void) {
    const eventName = "onMineBlock";
    if (this.allevent.includes(eventName)) return this;
    this.allevent.push(eventName);
    const id = `${
      this.data["minecraft:item"].description.identifier.split(":")[1]
    }:${eventName}`;

    this.data["minecraft:item"].components["minecraft:custom_components"].push(
      id
    );

    this.script += `itemComponentRegistry.registerCustomComponent("${id}",{${eventName}:${calback}});`;

    return this;
  }

  onUse(calback: (arg: ItemComponentUseEvent) => void) {
    const eventName = "onUse";
    if (this.allevent.includes(eventName)) return this;
    this.allevent.push(eventName);
    const id = `${
      this.data["minecraft:item"].description.identifier.split(":")[1]
    }:${eventName}`;

    this.data["minecraft:item"].components["minecraft:custom_components"].push(
      id
    );

    this.script += `itemComponentRegistry.registerCustomComponent("${id}",{${eventName}:${calback}});`;

    return this;
  }

  onUseOn(calback: (arg: ItemComponentUseOnEvent) => void) {
    const eventName = "onUse";
    if (this.allevent.includes(eventName)) return this;
    this.allevent.push(eventName);
    const id = `${
      this.data["minecraft:item"].description.identifier.split(":")[1]
    }:${eventName}`;

    this.data["minecraft:item"].components["minecraft:custom_components"].push(
      id
    );

    this.script += `itemComponentRegistry.registerCustomComponent("${id}",{${eventName}:${calback}});`;

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
            collapse_vars: true,
          },
          mangle: {
            toplevel: true,
          },
        },
        parser: {
          syntax: "ecmascript",
        },
        transform: {},
      },
    });
    this.script = output.code;

    return this;
  }
}
