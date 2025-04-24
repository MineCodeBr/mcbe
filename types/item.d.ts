import { Category, ItemGroups, MinecraftItemGroupsArrayType } from "./index";

export type ItemComponentNames =
  | "minecraft:allow_off_hand"
  | "minecraft:can_destroy_in_creative"
  | "minecraft:cooldown"
  | "minecraft:creative_category"
  | "minecraft:damage"
  | "minecraft:digger"
  | "minecraft:display_name"
  | "minecraft:durability"
  | "minecraft:dye_powder"
  | "minecraft:enchantable"
  | "minecraft:entity_placer"
  | "minecraft:explodable"
  | "minecraft:food"
  | "minecraft:fuel"
  | "minecraft:hand_equipped"
  | "minecraft:icon"
  | "minecraft:ignores_permission"
  | "minecraft:knockback_resistance"
  | "minecraft:max_stack_size"
  | "minecraft:mining_speed"
  | "minecraft:mirrored_art"
  | "minecraft:on_use_on"
  | "minecraft:projectile"
  | "minecraft:render_offsets"
  | "minecraft:repairable"
  | "minecraft:requires_interact"
  | "minecraft:shooter"
  | "minecraft:stacked_by_data"
  | "minecraft:throwable"
  | "minecraft:use_duration"
  | "minecraft:weapon";

export interface ItemBase {
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
