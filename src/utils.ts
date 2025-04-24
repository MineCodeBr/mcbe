import chalk from "chalk";
import { randomUUID } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

export const log = (arg: string) =>
  console.log(`${chalk.bgBlue.black(" MCBE ")} ${arg}`);
export const warn = (arg: string, arg2: string) =>
  console.warn(
    `${chalk.white.bgYellow.black(" MCBE ")} ${arg}${
      arg2 ? `\n     > ${chalk.gray(arg2)}` : ""
    }`
  );
export const error = (arg: string, arg2?: string) => {
  console.error(
    `${chalk.bgRed.black(" MCBE ")} ${arg}${
      arg2 ? `\n     > ${chalk.gray(arg2)}` : ""
    }`
  );
  // process.exit(1);
};

export const isExistRoute = (path: string) => {
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
};

export function CreateManifest({
  behDir,
  resDir,
  name,
  description,
}: {
  behDir: string;
  resDir: string;
  name: string;
  description: string;
}) {
  let manifestBehavior = existsSync(behDir + "/manifest.json")
    ? JSON.parse(readFileSync(behDir + "/manifest.json") as any)
    : randomUUID();

  let manifestResource = existsSync(resDir + "/manifest.json")
    ? JSON.parse(readFileSync(resDir + "/manifest.json") as any)
    : randomUUID();

  const devUuid = manifestBehavior["header"]
    ? manifestBehavior["header"]["uuid"]
    : manifestBehavior;

  writeFileSync(
    resDir + "/manifest.json",
    JSON.stringify({
      format_version: 2,
      header: {
        name: name,
        description: description,
        uuid: devUuid,
        version: [1, 0, 0],
        min_engine_version: [1, 20, 60],
      },
      modules: [
        {
          type: "resources",
          uuid: manifestResource["modules"]
            ? manifestResource["modules"][0]["uuid"]
            : manifestResource,
          version: [1, 0, 0],
        },
      ],
    })
  );

  writeFileSync(
    behDir + "/manifest.json",
    JSON.stringify({
      format_version: 2,
      header: {
        name: name,
        description: description,
        uuid: manifestBehavior["header"]
          ? manifestBehavior["header"]["uuid"]
          : manifestBehavior,
        version: [1, 0, 0],
        min_engine_version: [1, 20, 60],
      },
      modules: [
        {
          uuid: manifestBehavior["modules"]
            ? manifestBehavior["modules"][0]["uuid"]
            : manifestBehavior,
          version: [1, 0, 0],
          type: "script",
          language: "javascript",
          entry: "scripts/index.js",
        },
      ],
      dependencies: [
        {
          module_name: "@minecraft/server",
          version: "1.16.0",
        },
        {
          module_name: "@minecraft/server-ui",
          version: "1.3.0",
        },
        {
          uuid: devUuid,
          version: [1, 0, 0],
        },
      ],
    })
  );
}

export const MinecraftItemGroupsArray = [
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
  "minecraft:itemGroup.name.woolCarpet",
] as const;

export const EnchantableSlots = {
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
  All: "all",
} as const;
