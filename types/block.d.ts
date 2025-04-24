import { Category, MaterialTypes, MinecraftItemGroupsArrayType } from ".";

export interface BlockBase {
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

export type BlockComponentNames =
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
