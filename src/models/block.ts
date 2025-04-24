import { BlockBase, BlockComponentNames } from "../../types";
import {
  BlockComponentEntityFallOnEvent,
  BlockComponentOnPlaceEvent,
  BlockComponentPlayerDestroyEvent,
  BlockComponentPlayerPlaceBeforeEvent,
  BlockComponentRandomTickEvent,
  BlockComponentStepOffEvent,
  BlockComponentStepOnEvent,
  BlockComponentTickEvent,
} from "@minecraft/server";
import { transformSync } from "@swc/core";
import { z } from "zod";
import { error, warn } from "../utils";
import chalk from "chalk";

const BlockComponentModel = {
  "minecraft:breathability": z.enum(["solid", "air"]),
  "minecraft:breakonpush": z.boolean(),
  "minecraft:buoyancy": z.number(),
  "minecraft:collision_box": z.union([
    z.boolean(),
    z.object({
      origin: z.tuple([z.number(), z.number(), z.number()]).optional(),
      size: z.tuple([z.number(), z.number(), z.number()]).optional(),
    }),
  ]),
  "minecraft:crafting_table": z.object({
    crafting_tags: z.array(z.string()),
    table_name: z.string().optional(),
  }),
  "minecraft:creative_category": z.object({
    parent: z.string().optional(),
  }),
  "minecraft:custom_components": z.array(z.string()),
  "minecraft:destructible_by_explosion": z.union([
    z.boolean(),
    z.object({
      explosion_resistance: z.number().optional(),
    }),
  ]),
  "minecraft:destructible_by_mining": z.union([
    z.boolean(),
    z.object({
      seconds_to_destroy: z.number().optional(),
      item_specific_speeds: z
        .array(
          z.object({
            item: z.string(),
            destroy_speed: z.number(),
          })
        )
        .optional(),
    }),
  ]),
  "minecraft:destroy_time": z.number(),
  "minecraft:destruction_particles": z.object({
    texture: z.string(),
    tint_method: z.string().optional(),
  }),
  "minecraft:display_name": z.string(),
  "minecraft:entity_collision": z.boolean(),
  "minecraft:explosion_resistance": z.number(),
  "minecraft:flammable": z.object({
    catch_chance_modifier: z.number().optional(),
    destroy_chance_modifier: z.number().optional(),
  }),
  "minecraft:tick": z.object({
    interval_range: z.array(z.number(), z.number()),
    looping: z.boolean().optional(),
  }),
  "minecraft:friction": z.number(),
  "minecraft:entity_fall_on": z.object({
    min_fall_distance: z.number().min(1),
  }),
  "minecraft:geometry": z.string(),
  "minecraft:light_dampening": z.number(),
  "minecraft:light_emission": z.number(),
  "minecraft:loot": z.string(),
  "minecraft:map_color": z.string().regex(/^#[a-fA-F0-9]{6}$/),
  "minecraft:material_instances": z.record(
    z.object({
      texture: z.string(),
      render_method: z.string().optional(), // Coloque z.nativeEnum(MaterialTypes) se tiver enum
    })
  ),
  "minecraft:pick_collision": z.boolean(),
  "minecraft:placement_filter": z.object({
    conditions: z.array(
      z.object({
        allowed_faces: z.array(z.string()).optional(),
        block_filter: z.array(z.string()).optional(),
      })
    ),
  }),
  "minecraft:pushable": z.boolean(),
  "minecraft:random_ticking": z.boolean(),
  "minecraft:rotation": z.object({
    cardinal_direction: z.boolean(),
  }),
  "minecraft:transformation": z.object({
    rotation: z.tuple([z.number(), z.number(), z.number()]).optional(),
    scale: z.tuple([z.number(), z.number(), z.number()]).optional(),
    translation: z.tuple([z.number(), z.number(), z.number()]).optional(),
  }),
  "minecraft:unit_cube": z.boolean(),
  "minecraft:unwalkable": z.boolean(),
};

export default class Block {
  data: BlockBase;
  script: string;
  allevent: string[];
  constructor(identifier: `${string}:${string}`) {
    this.data = {
      format_version: "1.20.10",
      "minecraft:block": {
        description: {
          identifier,
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
  setComponent<T extends BlockComponentNames>(
    name: T,
    data: T extends keyof typeof BlockComponentModel
      ? z.infer<(typeof BlockComponentModel)[T]>
      : never
  ) {
    const result = BlockComponentModel[name].safeParse(data);
    if (result.success) {
      this.data["minecraft:block"]["components"] = {
        ...this.data["minecraft:block"]["components"],
        [name]: data,
      };
    } else {
      error(
        `${chalk.blueBright(
          `(${this.data["minecraft:block"].description.identifier})`
        )} Error Component ${name}`,
        result.error.format()._errors[0]
      );
    }

    return this;
  }

  beforeOnPlayerPlace(
    calback: (arg: BlockComponentPlayerPlaceBeforeEvent) => void
  ) {
    if (this.allevent.includes("beforeOnPlayerPlace")) return this;
    this.allevent.push("beforeOnPlayerPlace");
    const id =
      this.data["minecraft:block"].description.identifier.split(":")[1] +
      ":beforeOnPlayerPlace";

    this.data["minecraft:block"].components["minecraft:custom_components"].push(
      id
    );

    this.script += `blockComponentRegistry.registerCustomComponent("${id}",{beforeOnPlayerPlace:${calback}});`;

    return this;
  }

  onEntityFallOn(calback: (arg: BlockComponentEntityFallOnEvent) => void) {
    if (this.allevent.includes("onEntityFallOn")) return this;
    this.allevent.push("onEntityFallOn");

    if (
      !this.data["minecraft:block"].components["minecraft:entity_fall_on"]
        ?.min_fall_distance ||
      Number(
        this.data["minecraft:block"].components["minecraft:entity_fall_on"]
          ?.min_fall_distance
      ) > 0
    ) {
      warn(
        `[${this.data["minecraft:block"].description.identifier}] Block Error Event [onEntityFallOn]`,
        `Need set component ${chalk.blueBright(
          "entity_fall_on"
        )}\n      .setComponent("minecraft:entity_fall_on", { min_fall_distance: 1 })`
      );
      return this;
    }

    const id =
      this.data["minecraft:block"].description.identifier.split(":")[1] +
      ":onEntityFallOn";

    this.data["minecraft:block"].components["minecraft:custom_components"].push(
      id
    );

    this.script += `blockComponentRegistry.registerCustomComponent("${id}",{onEntityFallOn:${calback}});`;

    return this;
  }

  onPlace(calback: (arg: BlockComponentOnPlaceEvent) => void) {
    if (this.allevent.includes("onPlace")) return this;
    this.allevent.push("onPlace");
    const id =
      this.data["minecraft:block"].description.identifier.split(":")[1] +
      ":onPlace";

    this.data["minecraft:block"].components["minecraft:custom_components"].push(
      id
    );

    this.script += `blockComponentRegistry.registerCustomComponent("${id}",{onPlace:${calback}});`;

    return this;
  }

  onPlayerDestroy(calback: (arg: BlockComponentPlayerDestroyEvent) => void) {
    if (this.allevent.includes("onPlayerDestroy")) return this;
    this.allevent.push("onPlayerDestroy");
    const id =
      this.data["minecraft:block"].description.identifier.split(":")[1] +
      ":onPlayerDestroy";

    this.data["minecraft:block"].components["minecraft:custom_components"].push(
      id
    );

    this.script += `blockComponentRegistry.registerCustomComponent("${id}",{onPlayerDestroy:${calback}});`;

    return this;
  }

  onPlayerInteract(
    calback: (arg: BlockComponentPlayerPlaceBeforeEvent) => void
  ) {
    if (this.allevent.includes("onPlayerInteract")) return this;
    this.allevent.push("onPlayerInteract");
    const id =
      this.data["minecraft:block"].description.identifier.split(":")[1] +
      ":onPlayerInteract";

    this.data["minecraft:block"].components["minecraft:custom_components"].push(
      id
    );

    this.script += `blockComponentRegistry.registerCustomComponent("${id}",{onPlayerInteract:${calback}});`;

    return this;
  }

  onRandomTick(calback: (arg: BlockComponentRandomTickEvent) => void) {
    if (this.allevent.includes("onRandomTick")) return this;
    this.allevent.push("onRandomTick");
    const id =
      this.data["minecraft:block"].description.identifier.split(":")[1] +
      ":onRandomTick";

    this.data["minecraft:block"].components["minecraft:custom_components"].push(
      id
    );

    this.script += `blockComponentRegistry.registerCustomComponent("${id}",{onRandomTick:${calback}});`;

    return this;
  }

  onStepOff(calback: (arg: BlockComponentStepOffEvent) => void) {
    if (this.allevent.includes("onStepOff")) return this;
    this.allevent.push("onStepOff");
    const id =
      this.data["minecraft:block"].description.identifier.split(":")[1] +
      ":onStepOff";

    this.data["minecraft:block"].components["minecraft:custom_components"].push(
      id
    );

    this.script += `blockComponentRegistry.registerCustomComponent("${id}",{onStepOff:${calback}});`;

    return this;
  }
  onStepOn(calback: (arg: BlockComponentStepOnEvent) => void) {
    if (this.allevent.includes("onStepOn")) return this;
    this.allevent.push("onStepOn");
    const id =
      this.data["minecraft:block"].description.identifier.split(":")[1] +
      ":onStepOn";

    this.data["minecraft:block"].components["minecraft:custom_components"].push(
      id
    );

    this.script += `blockComponentRegistry.registerCustomComponent("${id}",{onStepOn:${calback}});`;

    return this;
  }
  onTick(calback: (arg: BlockComponentTickEvent) => void) {
    if (this.allevent.includes("onTick")) return this;
    this.allevent.push("onTick");

    if (
      !this.data["minecraft:block"].components["minecraft:tick"]?.interval_range
    ) {
      warn(
        `[${this.data["minecraft:block"].description.identifier}] Block Error Event [onTick]`,
        `Need set component ${chalk.blueBright(
          "minecraft:tick"
        )}\n      .setComponent("minecraft:tick", { interval_range: [10, 10] })`
      );
      return this;
    }

    const id =
      this.data["minecraft:block"].description.identifier.split(":")[1] +
      ":onTick";

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
