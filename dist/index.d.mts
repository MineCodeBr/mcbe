import { BlockComponentPlayerPlaceBeforeEvent, BlockComponentEntityFallOnEvent, BlockComponentOnPlaceEvent, BlockComponentPlayerDestroyEvent, BlockComponentRandomTickEvent, BlockComponentStepOffEvent, BlockComponentStepOnEvent, BlockComponentTickEvent, ItemComponentConsumeEvent, ItemComponentCompleteUseEvent, ItemComponentHitEntityEvent, ItemComponentMineBlockEvent, ItemComponentUseEvent, ItemComponentUseOnEvent } from '@minecraft/server';
import { z } from 'zod';

interface BlockBase {
  format_version: "1.20.10" | `${number}.${number}.${number}`;
  "minecraft:block": {
    description: {
      identifier: string;
      menu_category?: {
        category: Category;
        group: MinecraftItemGroupsArrayType;
      };
    };
    components: {
      "minecraft:custom_components": string[];
      "minecraft:destroy_time"?: number;
      "minecraft:entity_fall_on"?: {
        min_fall_distance: number;
      };
      "minecraft:tick"?: {
        interval_range: [number, number];
        looping?: boolean;
      };
      "minecraft:explosion_resistance"?: number;
      "minecraft:map_color"?: `#${string}`;
      "minecraft:light_dampening"?: number;
      "minecraft:light_emission"?: number;
      "minecraft:friction"?: number;
      "minecraft:flammable"?: {
        catch_chance_modifier?: number;
        destroy_chance_modifier?: number;
      };
      "minecraft:material_instances"?: {
        "*": {
          texture: string;
          render_method?: MaterialTypes;
        };
        [key: string]: {
          texture: string;
          render_method?: MaterialTypes;
        };
      };
      "minecraft:breathability"?: "solid" | "air";
      "minecraft:collision_box"?:
        | boolean
        | {
            origin?: [number, number, number];
            size?: [number, number, number];
          };
      "minecraft:crafting_table"?: {
        crafting_tags: string[];
        table_name?: string;
      };
      "minecraft:destructible_by_explosion"?:
        | boolean
        | {
            explosion_resistance?: number;
          };
      "minecraft:destructible_by_mining"?:
        | boolean
        | {
            seconds_to_destroy?: number;
            item_specific_speeds?: {
              item: string;
              destroy_speed: number;
            }[];
          };
      "minecraft:destruction_particles"?: {
        texture: string;
        tint_method?: string;
      };
      "minecraft:display_name"?: string;
      "minecraft:loot"?: string;
      "minecraft:geometry"?: string;
      "minecraft:placement_filter"?: {
        conditions: {
          allowed_faces?: string[];
          block_filter?: string[];
        }[];
      };
      "minecraft:rotation"?: {
        cardinal_direction: boolean;
      };
      "minecraft:unit_cube"?: boolean;
      "minecraft:unwalkable"?: boolean;
      "minecraft:breakonpush"?: boolean;
      "minecraft:buoyancy"?: number;
      "minecraft:entity_collision"?: boolean;
      "minecraft:pick_collision"?: boolean;
      "minecraft:pushable"?: boolean;
      "minecraft:random_ticking"?: boolean;
      "minecraft:transformation"?: {
        rotation?: [number, number, number];
        scale?: [number, number, number];
        translation?: [number, number, number];
      };
      "minecraft:unit_cube"?: boolean;
      "minecraft:unwalkable"?: boolean;
    };
  };
}

type BlockComponentNames =
  | "minecraft:breathability"
  | "minecraft:breakonpush"
  | "minecraft:buoyancy"
  | "minecraft:collision_box"
  | "minecraft:crafting_table"
  | "minecraft:creative_category"
  | "minecraft:custom_components"
  | "minecraft:destructible_by_explosion"
  | "minecraft:destructible_by_mining"
  | "minecraft:destroy_time"
  | "minecraft:destruction_particles"
  | "minecraft:display_name"
  | "minecraft:entity_collision"
  | "minecraft:explosion_resistance"
  | "minecraft:flammable"
  | "minecraft:friction"
  | "minecraft:geometry"
  | "minecraft:light_dampening"
  | "minecraft:light_emission"
  | "minecraft:loot"
  | "minecraft:map_color"
  | "minecraft:material_instances"
  | "minecraft:pick_collision"
  | "minecraft:placement_filter"
  | "minecraft:pushable"
  | "minecraft:random_ticking"
  | "minecraft:rotation"
  | "minecraft:transformation"
  | "minecraft:unit_cube"
  | "minecraft:unwalkable";

interface ItemBase {
  format_version: "1.20.10" | `${number}.${number}.${number}`;
  "minecraft:item": {
    description: {
      identifier: string;
      menu_category?: {
        category: Category;
        group?: MinecraftItemGroupsArrayType;
      };
    };
    components: {
      /** Always present: lists custom component keys defined elsewhere */
      "minecraft:custom_components": string[];

      /** Consumable foods */
      "minecraft:food"?: {
        nutrition: number;
        saturation_modifier: number;
        can_always_eat?: boolean;
        effects?: {
          effect: string;
          chance: number;
          duration: number;
          amplifier?: number;
        }[];
      };

      /** Burnable items */
      "minecraft:fuel"?: {
        burn_time: number;
      };

      /** Enchantment glow */
      "minecraft:glint"?: boolean;

      /** Held‑in‑hand rendering */
      "minecraft:hand_equipped"?: boolean;

      /** Tooltip color when hovered */
      "minecraft:hover_text_color"?: string;

      /** Icon texture mapping */
      "minecraft:icon"?: {
        texture: string;
      };

      /** Custom button for interaction */
      "minecraft:interact_button"?: {
        action: string;
        key: string;
      };

      /** Clipping in liquids */
      "minecraft:liquid_clipped"?: boolean;

      /** Stack size override */
      "minecraft:max_stack_size"?: number;

      /** Projectile properties */
      "minecraft:projectile"?: {
        on_collision: {
          event: string;
        }[];
        power?: number;
        inaccuracy?: number;
      };

      /** Item rarity tier */
      "minecraft:rarity"?: "common" | "uncommon" | "rare" | "epic";

      /** Record (music disc) playback settings */
      "minecraft:record"?: {
        sound?: string;
      };

      /** Repair material */
      "minecraft:repairable"?: {
        repair_items: string[];
        repair_item_tags?: string[];
      };

      /** Shooter behavior (for bows, etc.) */
      "minecraft:shooter"?: {
        projectile: string;
        count?: number;
      };

      /** Should the item despawn when dropped */
      "minecraft:should_despawn"?: boolean;

      /** Differentiate stacks by NBT/data */
      "minecraft:stacked_by_data"?: boolean;

      /** Storage item (like shulker box) */
      "minecraft:storage_item"?: {
        max_storage_items: number;
        allow_color_override?: boolean;
      };

      /** Maximum weight allowed inside */
      "minecraft:storage_weight_limit"?: number;

      /** Weight modifier for storage */
      "minecraft:storage_weight_modifier"?: number;

      /** Item tags for grouping */
      "minecraft:tags"?: string[];

      /** Throwable (snowballs, ender pearls) */
      "minecraft:throwable"?: {
        distance: number;
      };

      /** Use‑animation type (“eat”, “drink”, “block”, etc.) */
      "minecraft:use_animation"?: string;

      /** Modifiers applied on use */
      "minecraft:use_modifiers"?: {
        cooldown_time?: number;
        movement_modifier?: number;
      };

      /** Wearable items (armor, etc.) */
      "minecraft:wearable"?: {
        slot: string;
      };
    };
  };
}

type Category =
  | "construction"
  | "equipment"
  | "items"
  | "nature"
  | "none";

type MinecraftItemGroupsArrayType =
  | "minecraft:itemGroup.name.anvil"
  | "minecraft:itemGroup.name.arrow"
  | "minecraft:itemGroup.name.axe"
  | "minecraft:itemGroup.name.banner"
  | "minecraft:itemGroup.name.banner_pattern"
  | "minecraft:itemGroup.name.bed"
  | "minecraft:itemGroup.name.boat"
  | "minecraft:itemGroup.name.boots"
  | "minecraft:itemGroup.name.bundles"
  | "minecraft:itemGroup.name.buttons"
  | "minecraft:itemGroup.name.candles"
  | "minecraft:itemGroup.name.chalkboard"
  | "minecraft:itemGroup.name.chest"
  | "minecraft:itemGroup.name.chestboat"
  | "minecraft:itemGroup.name.chestplate"
  | "minecraft:itemGroup.name.compounds"
  | "minecraft:itemGroup.name.concrete"
  | "minecraft:itemGroup.name.concretePowder"
  | "minecraft:itemGroup.name.cookedFood"
  | "minecraft:itemGroup.name.copper"
  | "minecraft:itemGroup.name.coral"
  | "minecraft:itemGroup.name.coral_decorations"
  | "minecraft:itemGroup.name.crop"
  | "minecraft:itemGroup.name.door"
  | "minecraft:itemGroup.name.dye"
  | "minecraft:itemGroup.name.enchantedBook"
  | "minecraft:itemGroup.name.fence"
  | "minecraft:itemGroup.name.fenceGate"
  | "minecraft:itemGroup.name.firework"
  | "minecraft:itemGroup.name.fireworkStars"
  | "minecraft:itemGroup.name.flower"
  | "minecraft:itemGroup.name.glass"
  | "minecraft:itemGroup.name.glassPane"
  | "minecraft:itemGroup.name.glazedTerracotta"
  | "minecraft:itemGroup.name.goatHorn"
  | "minecraft:itemGroup.name.grass"
  | "minecraft:itemGroup.name.hanging_sign"
  | "minecraft:itemGroup.name.helmet"
  | "minecraft:itemGroup.name.hoe"
  | "minecraft:itemGroup.name.horseArmor"
  | "minecraft:itemGroup.name.leaves"
  | "minecraft:itemGroup.name.leggings"
  | "minecraft:itemGroup.name.lingeringPotion"
  | "minecraft:itemGroup.name.log"
  | "minecraft:itemGroup.name.minecart"
  | "minecraft:itemGroup.name.miscFood"
  | "minecraft:itemGroup.name.mobEgg"
  | "minecraft:itemGroup.name.monsterStoneEgg"
  | "minecraft:itemGroup.name.mushroom"
  | "minecraft:itemGroup.name.netherWartBlock"
  | "minecraft:itemGroup.name.ominousBottle"
  | "minecraft:itemGroup.name.ore"
  | "minecraft:itemGroup.name.permission"
  | "minecraft:itemGroup.name.pickaxe"
  | "minecraft:itemGroup.name.planks"
  | "minecraft:itemGroup.name.potion"
  | "minecraft:itemGroup.name.potterySherds"
  | "minecraft:itemGroup.name.pressurePlate"
  | "minecraft:itemGroup.name.products"
  | "minecraft:itemGroup.name.rail"
  | "minecraft:itemGroup.name.rawFood"
  | "minecraft:itemGroup.name.record"
  | "minecraft:itemGroup.name.sandstone"
  | "minecraft:itemGroup.name.sapling"
  | "minecraft:itemGroup.name.sculk"
  | "minecraft:itemGroup.name.seed"
  | "minecraft:itemGroup.name.shovel"
  | "minecraft:itemGroup.name.shulkerBox"
  | "minecraft:itemGroup.name.sign"
  | "minecraft:itemGroup.name.skull"
  | "minecraft:itemGroup.name.slab"
  | "minecraft:itemGroup.name.smithing_templates"
  | "minecraft:itemGroup.name.splashPotion"
  | "minecraft:itemGroup.name.stainedClay"
  | "minecraft:itemGroup.name.stairs"
  | "minecraft:itemGroup.name.stone"
  | "minecraft:itemGroup.name.stoneBrick"
  | "minecraft:itemGroup.name.sword"
  | "minecraft:itemGroup.name.trapdoor"
  | "minecraft:itemGroup.name.walls"
  | "minecraft:itemGroup.name.wood"
  | "minecraft:itemGroup.name.wool"
  | "minecraft:itemGroup.name.woolCarpet";

type MaterialTypes =
  | "opaque"
  | "blend"
  | "double_sided"
  | "alpha_test"
  | "alpha_test_single_sided";

declare const BlockComponentModel: {
    "minecraft:breathability": z.ZodEnum<["solid", "air"]>;
    "minecraft:breakonpush": z.ZodBoolean;
    "minecraft:buoyancy": z.ZodNumber;
    "minecraft:collision_box": z.ZodUnion<[z.ZodBoolean, z.ZodObject<{
        origin: z.ZodOptional<z.ZodTuple<[z.ZodNumber, z.ZodNumber, z.ZodNumber], null>>;
        size: z.ZodOptional<z.ZodTuple<[z.ZodNumber, z.ZodNumber, z.ZodNumber], null>>;
    }, "strip", z.ZodTypeAny, {
        origin?: [number, number, number] | undefined;
        size?: [number, number, number] | undefined;
    }, {
        origin?: [number, number, number] | undefined;
        size?: [number, number, number] | undefined;
    }>]>;
    "minecraft:crafting_table": z.ZodObject<{
        crafting_tags: z.ZodArray<z.ZodString, "many">;
        table_name: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        crafting_tags: string[];
        table_name?: string | undefined;
    }, {
        crafting_tags: string[];
        table_name?: string | undefined;
    }>;
    "minecraft:creative_category": z.ZodObject<{
        parent: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        parent?: string | undefined;
    }, {
        parent?: string | undefined;
    }>;
    "minecraft:custom_components": z.ZodArray<z.ZodString, "many">;
    "minecraft:destructible_by_explosion": z.ZodUnion<[z.ZodBoolean, z.ZodObject<{
        explosion_resistance: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        explosion_resistance?: number | undefined;
    }, {
        explosion_resistance?: number | undefined;
    }>]>;
    "minecraft:destructible_by_mining": z.ZodUnion<[z.ZodBoolean, z.ZodObject<{
        seconds_to_destroy: z.ZodOptional<z.ZodNumber>;
        item_specific_speeds: z.ZodOptional<z.ZodArray<z.ZodObject<{
            item: z.ZodString;
            destroy_speed: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            item: string;
            destroy_speed: number;
        }, {
            item: string;
            destroy_speed: number;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        seconds_to_destroy?: number | undefined;
        item_specific_speeds?: {
            item: string;
            destroy_speed: number;
        }[] | undefined;
    }, {
        seconds_to_destroy?: number | undefined;
        item_specific_speeds?: {
            item: string;
            destroy_speed: number;
        }[] | undefined;
    }>]>;
    "minecraft:destroy_time": z.ZodNumber;
    "minecraft:destruction_particles": z.ZodObject<{
        texture: z.ZodString;
        tint_method: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        texture: string;
        tint_method?: string | undefined;
    }, {
        texture: string;
        tint_method?: string | undefined;
    }>;
    "minecraft:display_name": z.ZodString;
    "minecraft:entity_collision": z.ZodBoolean;
    "minecraft:explosion_resistance": z.ZodNumber;
    "minecraft:flammable": z.ZodObject<{
        catch_chance_modifier: z.ZodOptional<z.ZodNumber>;
        destroy_chance_modifier: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        catch_chance_modifier?: number | undefined;
        destroy_chance_modifier?: number | undefined;
    }, {
        catch_chance_modifier?: number | undefined;
        destroy_chance_modifier?: number | undefined;
    }>;
    "minecraft:tick": z.ZodObject<{
        interval_range: z.ZodArray<z.ZodNumber, "many">;
        looping: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        interval_range: number[];
        looping?: boolean | undefined;
    }, {
        interval_range: number[];
        looping?: boolean | undefined;
    }>;
    "minecraft:friction": z.ZodNumber;
    "minecraft:entity_fall_on": z.ZodObject<{
        min_fall_distance: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        min_fall_distance: number;
    }, {
        min_fall_distance: number;
    }>;
    "minecraft:geometry": z.ZodString;
    "minecraft:light_dampening": z.ZodNumber;
    "minecraft:light_emission": z.ZodNumber;
    "minecraft:loot": z.ZodString;
    "minecraft:map_color": z.ZodString;
    "minecraft:material_instances": z.ZodRecord<z.ZodString, z.ZodObject<{
        texture: z.ZodString;
        render_method: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        texture: string;
        render_method?: string | undefined;
    }, {
        texture: string;
        render_method?: string | undefined;
    }>>;
    "minecraft:pick_collision": z.ZodBoolean;
    "minecraft:placement_filter": z.ZodObject<{
        conditions: z.ZodArray<z.ZodObject<{
            allowed_faces: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            block_filter: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            allowed_faces?: string[] | undefined;
            block_filter?: string[] | undefined;
        }, {
            allowed_faces?: string[] | undefined;
            block_filter?: string[] | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        conditions: {
            allowed_faces?: string[] | undefined;
            block_filter?: string[] | undefined;
        }[];
    }, {
        conditions: {
            allowed_faces?: string[] | undefined;
            block_filter?: string[] | undefined;
        }[];
    }>;
    "minecraft:pushable": z.ZodBoolean;
    "minecraft:random_ticking": z.ZodBoolean;
    "minecraft:rotation": z.ZodObject<{
        cardinal_direction: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        cardinal_direction: boolean;
    }, {
        cardinal_direction: boolean;
    }>;
    "minecraft:transformation": z.ZodObject<{
        rotation: z.ZodOptional<z.ZodTuple<[z.ZodNumber, z.ZodNumber, z.ZodNumber], null>>;
        scale: z.ZodOptional<z.ZodTuple<[z.ZodNumber, z.ZodNumber, z.ZodNumber], null>>;
        translation: z.ZodOptional<z.ZodTuple<[z.ZodNumber, z.ZodNumber, z.ZodNumber], null>>;
    }, "strip", z.ZodTypeAny, {
        rotation?: [number, number, number] | undefined;
        scale?: [number, number, number] | undefined;
        translation?: [number, number, number] | undefined;
    }, {
        rotation?: [number, number, number] | undefined;
        scale?: [number, number, number] | undefined;
        translation?: [number, number, number] | undefined;
    }>;
    "minecraft:unit_cube": z.ZodBoolean;
    "minecraft:unwalkable": z.ZodBoolean;
};
declare class Block {
    data: BlockBase;
    script: string;
    allevent: string[];
    constructor(identifier: `${string}:${string}`);
    setComponent<T extends BlockComponentNames>(name: T, data: T extends keyof typeof BlockComponentModel ? z.infer<(typeof BlockComponentModel)[T]> : never): this;
    beforeOnPlayerPlace(calback: (arg: BlockComponentPlayerPlaceBeforeEvent) => void): this;
    onEntityFallOn(calback: (arg: BlockComponentEntityFallOnEvent) => void): this;
    onPlace(calback: (arg: BlockComponentOnPlaceEvent) => void): this;
    onPlayerDestroy(calback: (arg: BlockComponentPlayerDestroyEvent) => void): this;
    onPlayerInteract(calback: (arg: BlockComponentPlayerPlaceBeforeEvent) => void): this;
    onRandomTick(calback: (arg: BlockComponentRandomTickEvent) => void): this;
    onStepOff(calback: (arg: BlockComponentStepOffEvent) => void): this;
    onStepOn(calback: (arg: BlockComponentStepOnEvent) => void): this;
    onTick(calback: (arg: BlockComponentTickEvent) => void): this;
    toJSON(): this;
}

declare const ItemComponentModel: {
    "minecraft:allow_off_hand": z.ZodBoolean;
    "minecraft:armor": z.ZodObject<{
        protection: z.ZodNumber;
        texture_type: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        protection: number;
        texture_type?: string | undefined;
    }, {
        protection: number;
        texture_type?: string | undefined;
    }>;
    "minecraft:block_placer": z.ZodObject<{
        block: z.ZodString;
        use_on: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        block: string;
        use_on?: string[] | undefined;
    }, {
        block: string;
        use_on?: string[] | undefined;
    }>;
    "minecraft:can_destroy_in_creative": z.ZodBoolean;
    "minecraft:cooldown": z.ZodObject<{
        category: z.ZodString;
        duration: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        category: string;
        duration: number;
    }, {
        category: string;
        duration: number;
    }>;
    "minecraft:creative_category": z.ZodObject<{
        category: z.ZodEnum<["construction", "equipment", "items", "nature", "none"]>;
        group: z.ZodEnum<["minecraft:itemGroup.name.anvil", "minecraft:itemGroup.name.arrow", "minecraft:itemGroup.name.axe", "minecraft:itemGroup.name.banner", "minecraft:itemGroup.name.banner_pattern", "minecraft:itemGroup.name.bed", "minecraft:itemGroup.name.boat", "minecraft:itemGroup.name.boots", "minecraft:itemGroup.name.bundles", "minecraft:itemGroup.name.buttons", "minecraft:itemGroup.name.candles", "minecraft:itemGroup.name.chalkboard", "minecraft:itemGroup.name.chest", "minecraft:itemGroup.name.chestboat", "minecraft:itemGroup.name.chestplate", "minecraft:itemGroup.name.compounds", "minecraft:itemGroup.name.concrete", "minecraft:itemGroup.name.concretePowder", "minecraft:itemGroup.name.cookedFood", "minecraft:itemGroup.name.copper", "minecraft:itemGroup.name.coral", "minecraft:itemGroup.name.coral_decorations", "minecraft:itemGroup.name.crop", "minecraft:itemGroup.name.door", "minecraft:itemGroup.name.dye", "minecraft:itemGroup.name.enchantedBook", "minecraft:itemGroup.name.fence", "minecraft:itemGroup.name.fenceGate", "minecraft:itemGroup.name.firework", "minecraft:itemGroup.name.fireworkStars", "minecraft:itemGroup.name.flower", "minecraft:itemGroup.name.glass", "minecraft:itemGroup.name.glassPane", "minecraft:itemGroup.name.glazedTerracotta", "minecraft:itemGroup.name.goatHorn", "minecraft:itemGroup.name.grass", "minecraft:itemGroup.name.hanging_sign", "minecraft:itemGroup.name.helmet", "minecraft:itemGroup.name.hoe", "minecraft:itemGroup.name.horseArmor", "minecraft:itemGroup.name.leaves", "minecraft:itemGroup.name.leggings", "minecraft:itemGroup.name.lingeringPotion", "minecraft:itemGroup.name.log", "minecraft:itemGroup.name.minecart", "minecraft:itemGroup.name.miscFood", "minecraft:itemGroup.name.mobEgg", "minecraft:itemGroup.name.monsterStoneEgg", "minecraft:itemGroup.name.mushroom", "minecraft:itemGroup.name.netherWartBlock", "minecraft:itemGroup.name.ominousBottle", "minecraft:itemGroup.name.ore", "minecraft:itemGroup.name.permission", "minecraft:itemGroup.name.pickaxe", "minecraft:itemGroup.name.planks", "minecraft:itemGroup.name.potion", "minecraft:itemGroup.name.potterySherds", "minecraft:itemGroup.name.pressurePlate", "minecraft:itemGroup.name.products", "minecraft:itemGroup.name.rail", "minecraft:itemGroup.name.rawFood", "minecraft:itemGroup.name.record", "minecraft:itemGroup.name.sandstone", "minecraft:itemGroup.name.sapling", "minecraft:itemGroup.name.sculk", "minecraft:itemGroup.name.seed", "minecraft:itemGroup.name.shovel", "minecraft:itemGroup.name.shulkerBox", "minecraft:itemGroup.name.sign", "minecraft:itemGroup.name.skull", "minecraft:itemGroup.name.slab", "minecraft:itemGroup.name.smithing_templates", "minecraft:itemGroup.name.splashPotion", "minecraft:itemGroup.name.stainedClay", "minecraft:itemGroup.name.stairs", "minecraft:itemGroup.name.stone", "minecraft:itemGroup.name.stoneBrick", "minecraft:itemGroup.name.sword", "minecraft:itemGroup.name.trapdoor", "minecraft:itemGroup.name.walls", "minecraft:itemGroup.name.wood", "minecraft:itemGroup.name.wool", "minecraft:itemGroup.name.woolCarpet"]>;
    }, "strip", z.ZodTypeAny, {
        category: "construction" | "equipment" | "items" | "nature" | "none";
        group: "minecraft:itemGroup.name.anvil" | "minecraft:itemGroup.name.arrow" | "minecraft:itemGroup.name.axe" | "minecraft:itemGroup.name.banner" | "minecraft:itemGroup.name.banner_pattern" | "minecraft:itemGroup.name.bed" | "minecraft:itemGroup.name.boat" | "minecraft:itemGroup.name.boots" | "minecraft:itemGroup.name.bundles" | "minecraft:itemGroup.name.buttons" | "minecraft:itemGroup.name.candles" | "minecraft:itemGroup.name.chalkboard" | "minecraft:itemGroup.name.chest" | "minecraft:itemGroup.name.chestboat" | "minecraft:itemGroup.name.chestplate" | "minecraft:itemGroup.name.compounds" | "minecraft:itemGroup.name.concrete" | "minecraft:itemGroup.name.concretePowder" | "minecraft:itemGroup.name.cookedFood" | "minecraft:itemGroup.name.copper" | "minecraft:itemGroup.name.coral" | "minecraft:itemGroup.name.coral_decorations" | "minecraft:itemGroup.name.crop" | "minecraft:itemGroup.name.door" | "minecraft:itemGroup.name.dye" | "minecraft:itemGroup.name.enchantedBook" | "minecraft:itemGroup.name.fence" | "minecraft:itemGroup.name.fenceGate" | "minecraft:itemGroup.name.firework" | "minecraft:itemGroup.name.fireworkStars" | "minecraft:itemGroup.name.flower" | "minecraft:itemGroup.name.glass" | "minecraft:itemGroup.name.glassPane" | "minecraft:itemGroup.name.glazedTerracotta" | "minecraft:itemGroup.name.goatHorn" | "minecraft:itemGroup.name.grass" | "minecraft:itemGroup.name.hanging_sign" | "minecraft:itemGroup.name.helmet" | "minecraft:itemGroup.name.hoe" | "minecraft:itemGroup.name.horseArmor" | "minecraft:itemGroup.name.leaves" | "minecraft:itemGroup.name.leggings" | "minecraft:itemGroup.name.lingeringPotion" | "minecraft:itemGroup.name.log" | "minecraft:itemGroup.name.minecart" | "minecraft:itemGroup.name.miscFood" | "minecraft:itemGroup.name.mobEgg" | "minecraft:itemGroup.name.monsterStoneEgg" | "minecraft:itemGroup.name.mushroom" | "minecraft:itemGroup.name.netherWartBlock" | "minecraft:itemGroup.name.ominousBottle" | "minecraft:itemGroup.name.ore" | "minecraft:itemGroup.name.permission" | "minecraft:itemGroup.name.pickaxe" | "minecraft:itemGroup.name.planks" | "minecraft:itemGroup.name.potion" | "minecraft:itemGroup.name.potterySherds" | "minecraft:itemGroup.name.pressurePlate" | "minecraft:itemGroup.name.products" | "minecraft:itemGroup.name.rail" | "minecraft:itemGroup.name.rawFood" | "minecraft:itemGroup.name.record" | "minecraft:itemGroup.name.sandstone" | "minecraft:itemGroup.name.sapling" | "minecraft:itemGroup.name.sculk" | "minecraft:itemGroup.name.seed" | "minecraft:itemGroup.name.shovel" | "minecraft:itemGroup.name.shulkerBox" | "minecraft:itemGroup.name.sign" | "minecraft:itemGroup.name.skull" | "minecraft:itemGroup.name.slab" | "minecraft:itemGroup.name.smithing_templates" | "minecraft:itemGroup.name.splashPotion" | "minecraft:itemGroup.name.stainedClay" | "minecraft:itemGroup.name.stairs" | "minecraft:itemGroup.name.stone" | "minecraft:itemGroup.name.stoneBrick" | "minecraft:itemGroup.name.sword" | "minecraft:itemGroup.name.trapdoor" | "minecraft:itemGroup.name.walls" | "minecraft:itemGroup.name.wood" | "minecraft:itemGroup.name.wool" | "minecraft:itemGroup.name.woolCarpet";
    }, {
        category: "construction" | "equipment" | "items" | "nature" | "none";
        group: "minecraft:itemGroup.name.anvil" | "minecraft:itemGroup.name.arrow" | "minecraft:itemGroup.name.axe" | "minecraft:itemGroup.name.banner" | "minecraft:itemGroup.name.banner_pattern" | "minecraft:itemGroup.name.bed" | "minecraft:itemGroup.name.boat" | "minecraft:itemGroup.name.boots" | "minecraft:itemGroup.name.bundles" | "minecraft:itemGroup.name.buttons" | "minecraft:itemGroup.name.candles" | "minecraft:itemGroup.name.chalkboard" | "minecraft:itemGroup.name.chest" | "minecraft:itemGroup.name.chestboat" | "minecraft:itemGroup.name.chestplate" | "minecraft:itemGroup.name.compounds" | "minecraft:itemGroup.name.concrete" | "minecraft:itemGroup.name.concretePowder" | "minecraft:itemGroup.name.cookedFood" | "minecraft:itemGroup.name.copper" | "minecraft:itemGroup.name.coral" | "minecraft:itemGroup.name.coral_decorations" | "minecraft:itemGroup.name.crop" | "minecraft:itemGroup.name.door" | "minecraft:itemGroup.name.dye" | "minecraft:itemGroup.name.enchantedBook" | "minecraft:itemGroup.name.fence" | "minecraft:itemGroup.name.fenceGate" | "minecraft:itemGroup.name.firework" | "minecraft:itemGroup.name.fireworkStars" | "minecraft:itemGroup.name.flower" | "minecraft:itemGroup.name.glass" | "minecraft:itemGroup.name.glassPane" | "minecraft:itemGroup.name.glazedTerracotta" | "minecraft:itemGroup.name.goatHorn" | "minecraft:itemGroup.name.grass" | "minecraft:itemGroup.name.hanging_sign" | "minecraft:itemGroup.name.helmet" | "minecraft:itemGroup.name.hoe" | "minecraft:itemGroup.name.horseArmor" | "minecraft:itemGroup.name.leaves" | "minecraft:itemGroup.name.leggings" | "minecraft:itemGroup.name.lingeringPotion" | "minecraft:itemGroup.name.log" | "minecraft:itemGroup.name.minecart" | "minecraft:itemGroup.name.miscFood" | "minecraft:itemGroup.name.mobEgg" | "minecraft:itemGroup.name.monsterStoneEgg" | "minecraft:itemGroup.name.mushroom" | "minecraft:itemGroup.name.netherWartBlock" | "minecraft:itemGroup.name.ominousBottle" | "minecraft:itemGroup.name.ore" | "minecraft:itemGroup.name.permission" | "minecraft:itemGroup.name.pickaxe" | "minecraft:itemGroup.name.planks" | "minecraft:itemGroup.name.potion" | "minecraft:itemGroup.name.potterySherds" | "minecraft:itemGroup.name.pressurePlate" | "minecraft:itemGroup.name.products" | "minecraft:itemGroup.name.rail" | "minecraft:itemGroup.name.rawFood" | "minecraft:itemGroup.name.record" | "minecraft:itemGroup.name.sandstone" | "minecraft:itemGroup.name.sapling" | "minecraft:itemGroup.name.sculk" | "minecraft:itemGroup.name.seed" | "minecraft:itemGroup.name.shovel" | "minecraft:itemGroup.name.shulkerBox" | "minecraft:itemGroup.name.sign" | "minecraft:itemGroup.name.skull" | "minecraft:itemGroup.name.slab" | "minecraft:itemGroup.name.smithing_templates" | "minecraft:itemGroup.name.splashPotion" | "minecraft:itemGroup.name.stainedClay" | "minecraft:itemGroup.name.stairs" | "minecraft:itemGroup.name.stone" | "minecraft:itemGroup.name.stoneBrick" | "minecraft:itemGroup.name.sword" | "minecraft:itemGroup.name.trapdoor" | "minecraft:itemGroup.name.walls" | "minecraft:itemGroup.name.wood" | "minecraft:itemGroup.name.wool" | "minecraft:itemGroup.name.woolCarpet";
    }>;
    "minecraft:damage": z.ZodObject<{
        value: z.ZodNumber;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        value: number;
        max?: number | undefined;
    }, {
        value: number;
        max?: number | undefined;
    }>;
    "minecraft:digger": z.ZodObject<{
        use_efficiency: z.ZodBoolean;
        destroy_speeds: z.ZodArray<z.ZodObject<{
            block: z.ZodString;
            speed: z.ZodNumber;
            on_dig: z.ZodOptional<z.ZodObject<{
                event: z.ZodString;
                target: z.ZodOptional<z.ZodEnum<["self", "block"]>>;
            }, "strip", z.ZodTypeAny, {
                event: string;
                target?: "block" | "self" | undefined;
            }, {
                event: string;
                target?: "block" | "self" | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            block: string;
            speed: number;
            on_dig?: {
                event: string;
                target?: "block" | "self" | undefined;
            } | undefined;
        }, {
            block: string;
            speed: number;
            on_dig?: {
                event: string;
                target?: "block" | "self" | undefined;
            } | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        use_efficiency: boolean;
        destroy_speeds: {
            block: string;
            speed: number;
            on_dig?: {
                event: string;
                target?: "block" | "self" | undefined;
            } | undefined;
        }[];
    }, {
        use_efficiency: boolean;
        destroy_speeds: {
            block: string;
            speed: number;
            on_dig?: {
                event: string;
                target?: "block" | "self" | undefined;
            } | undefined;
        }[];
    }>;
    "minecraft:display_name": z.ZodObject<{
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
    }, {
        value: string;
    }>;
    "minecraft:durability": z.ZodObject<{
        max_durability: z.ZodNumber;
        damage_chance: z.ZodOptional<z.ZodObject<{
            max: z.ZodNumber;
            min: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            min: number;
            max: number;
        }, {
            min: number;
            max: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        max_durability: number;
        damage_chance?: {
            min: number;
            max: number;
        } | undefined;
    }, {
        max_durability: number;
        damage_chance?: {
            min: number;
            max: number;
        } | undefined;
    }>;
    "minecraft:dye_powder": z.ZodObject<{
        color: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        color: number;
    }, {
        color: number;
    }>;
    "minecraft:enchantable": z.ZodObject<{
        slot: z.ZodEnum<["ArmorFeet" | "ArmorTorso" | "ArmorHead" | "ArmorLegs" | "Axe" | "Bow" | "CosmeticHead" | "Crossbow" | "Elytra" | "FishingRod" | "Flintsteel" | "Hoe" | "Pickaxe" | "Shears" | "Shield" | "Shovel" | "Sword" | "All"]>;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        slot: "ArmorFeet" | "ArmorTorso" | "ArmorHead" | "ArmorLegs" | "Axe" | "Bow" | "CosmeticHead" | "Crossbow" | "Elytra" | "FishingRod" | "Flintsteel" | "Hoe" | "Pickaxe" | "Shears" | "Shield" | "Shovel" | "Sword" | "All";
    }, {
        value: number;
        slot: "ArmorFeet" | "ArmorTorso" | "ArmorHead" | "ArmorLegs" | "Axe" | "Bow" | "CosmeticHead" | "Crossbow" | "Elytra" | "FishingRod" | "Flintsteel" | "Hoe" | "Pickaxe" | "Shears" | "Shield" | "Shovel" | "Sword" | "All";
    }>;
    "minecraft:entity_placer": z.ZodObject<{
        entity: z.ZodString;
        dispense_on: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        entity: string;
        dispense_on?: string[] | undefined;
    }, {
        entity: string;
        dispense_on?: string[] | undefined;
    }>;
    "minecraft:explodable": z.ZodBoolean;
    "minecraft:food": z.ZodObject<{
        nutrition: z.ZodNumber;
        saturation_modifier: z.ZodNumber;
        can_always_eat: z.ZodOptional<z.ZodBoolean>;
        effects: z.ZodOptional<z.ZodArray<z.ZodObject<{
            effect: z.ZodString;
            chance: z.ZodNumber;
            duration: z.ZodNumber;
            amplifier: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            duration: number;
            effect: string;
            chance: number;
            amplifier?: number | undefined;
        }, {
            duration: number;
            effect: string;
            chance: number;
            amplifier?: number | undefined;
        }>, "many">>;
        remove_effects: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        using_converts_to: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        nutrition: number;
        saturation_modifier: number;
        can_always_eat?: boolean | undefined;
        effects?: {
            duration: number;
            effect: string;
            chance: number;
            amplifier?: number | undefined;
        }[] | undefined;
        remove_effects?: string[] | undefined;
        using_converts_to?: string | undefined;
    }, {
        nutrition: number;
        saturation_modifier: number;
        can_always_eat?: boolean | undefined;
        effects?: {
            duration: number;
            effect: string;
            chance: number;
            amplifier?: number | undefined;
        }[] | undefined;
        remove_effects?: string[] | undefined;
        using_converts_to?: string | undefined;
    }>;
    "minecraft:fuel": z.ZodObject<{
        duration: z.ZodOptional<z.ZodNumber>;
        burn_time: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        duration?: number | undefined;
        burn_time?: number | undefined;
    }, {
        duration?: number | undefined;
        burn_time?: number | undefined;
    }>;
    "minecraft:hand_equipped": z.ZodBoolean;
    "minecraft:icon": z.ZodObject<{
        texture: z.ZodString;
        frame: z.ZodOptional<z.ZodNumber>;
        frame_count: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        texture: string;
        frame?: number | undefined;
        frame_count?: number | undefined;
    }, {
        texture: string;
        frame?: number | undefined;
        frame_count?: number | undefined;
    }>;
    "minecraft:ignores_permission": z.ZodBoolean;
    "minecraft:knockback_resistance": z.ZodObject<{
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
    }, {
        value: number;
    }>;
    "minecraft:max_stack_size": z.ZodNumber;
    "minecraft:mining_speed": z.ZodNumber;
    "minecraft:mirrored_art": z.ZodBoolean;
    "minecraft:on_use_on": z.ZodObject<{
        event: z.ZodString;
        target: z.ZodEnum<["self", "block"]>;
    }, "strip", z.ZodTypeAny, {
        event: string;
        target: "block" | "self";
    }, {
        event: string;
        target: "block" | "self";
    }>;
    "minecraft:projectile": z.ZodObject<{
        projectile_entity: z.ZodString;
        minimum_critical_power: z.ZodOptional<z.ZodNumber>;
        power: z.ZodOptional<z.ZodNumber>;
        inaccuracy: z.ZodOptional<z.ZodNumber>;
        shoot_sound: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        projectile_entity: string;
        minimum_critical_power?: number | undefined;
        power?: number | undefined;
        inaccuracy?: number | undefined;
        shoot_sound?: string | undefined;
    }, {
        projectile_entity: string;
        minimum_critical_power?: number | undefined;
        power?: number | undefined;
        inaccuracy?: number | undefined;
        shoot_sound?: string | undefined;
    }>;
    "minecraft:render_offsets": z.ZodObject<{
        main_hand: z.ZodOptional<z.ZodAny>;
        off_hand: z.ZodOptional<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        main_hand?: any;
        off_hand?: any;
    }, {
        main_hand?: any;
        off_hand?: any;
    }>;
    "minecraft:repairable": z.ZodObject<{
        repair_items: z.ZodArray<z.ZodString, "many">;
        repair_item_tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        repair_items: string[];
        repair_item_tags?: string[] | undefined;
    }, {
        repair_items: string[];
        repair_item_tags?: string[] | undefined;
    }>;
    "minecraft:requires_interact": z.ZodBoolean;
    "minecraft:shooter": z.ZodObject<{
        projectile: z.ZodString;
        count: z.ZodOptional<z.ZodNumber>;
        charge_on_draw: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        projectile: string;
        count?: number | undefined;
        charge_on_draw?: boolean | undefined;
    }, {
        projectile: string;
        count?: number | undefined;
        charge_on_draw?: boolean | undefined;
    }>;
    "minecraft:stacked_by_data": z.ZodBoolean;
    "minecraft:throwable": z.ZodObject<{
        do_swing_animation: z.ZodOptional<z.ZodBoolean>;
        launch_power_scale: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        do_swing_animation?: boolean | undefined;
        launch_power_scale?: number | undefined;
    }, {
        do_swing_animation?: boolean | undefined;
        launch_power_scale?: number | undefined;
    }>;
    "minecraft:use_duration": z.ZodNumber;
    "minecraft:weapon": z.ZodObject<{
        on_hit_block: z.ZodOptional<z.ZodString>;
        on_hurt_entity: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        on_hit_block?: string | undefined;
        on_hurt_entity?: string | undefined;
    }, {
        on_hit_block?: string | undefined;
        on_hurt_entity?: string | undefined;
    }>;
    "minecraft:glint": z.ZodBoolean;
    "minecraft:hover_text_color": z.ZodString;
    "minecraft:wearable": z.ZodObject<{
        slot: z.ZodEnum<["armor", "chest", "feet", "head", "legs", "offhand", "mainhand"]>;
        protection: z.ZodOptional<z.ZodNumber>;
        texture_type: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        slot: "armor" | "chest" | "feet" | "head" | "legs" | "offhand" | "mainhand";
        protection?: number | undefined;
        texture_type?: string | undefined;
    }, {
        slot: "armor" | "chest" | "feet" | "head" | "legs" | "offhand" | "mainhand";
        protection?: number | undefined;
        texture_type?: string | undefined;
    }>;
    "minecraft:record": z.ZodObject<{
        sound: z.ZodString;
        comparator_signal: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        sound: string;
        comparator_signal?: number | undefined;
    }, {
        sound: string;
        comparator_signal?: number | undefined;
    }>;
    "minecraft:use_animation": z.ZodEnum<["eat", "drink", "block", "bow", "spear", "crossbow", "camera"]>;
    "minecraft:tags": z.ZodArray<z.ZodString, "many">;
};
declare class Item {
    data: ItemBase;
    script: string;
    allevent: string[];
    constructor(identifier: `${string}:${string}`);
    setComponent<T extends keyof typeof ItemComponentModel>(name: T, data: T extends keyof typeof ItemComponentModel ? z.infer<(typeof ItemComponentModel)[T]> : never): this;
    onBeforeDurabilityDamage(calback: (arg: ItemComponentConsumeEvent) => void): this;
    onConsume(calback: (arg: ItemComponentConsumeEvent) => void): this;
    onCompleteUse(calback: (arg: ItemComponentCompleteUseEvent) => void): this;
    onHitEntity(calback: (arg: ItemComponentHitEntityEvent) => void): this;
    onMineBlock(calback: (arg: ItemComponentMineBlockEvent) => void): this;
    onUse(calback: (arg: ItemComponentUseEvent) => void): this;
    onUseOn(calback: (arg: ItemComponentUseOnEvent) => void): this;
    toJSON(): this;
}

declare class Sword extends Item {
    constructor(identifier: `${string}:${string}`);
    setDamage(damage: number): this;
}

declare class Addon {
    allScript: string;
    behDir: string;
    resDir: string;
    constructor({ name, description }: {
        name: string;
        description: string;
    });
    addBlocks(blocks: Block[]): this;
    addItems(items: Item[]): this;
}

export { Addon, Block, Item, Sword };
