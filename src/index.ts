import { writeFileSync } from "fs";
import { CreateManifest, isExistRoute } from "./utils";
import Block from "./models/block";
import Item from "./models/item";
import Sword from "./samples/sword";
import chalk from "chalk";
import { platform, userInfo } from "os";

const baseDir =
  platform() === "linux"
    ? `/home/${userInfo().username}/.local/share/mcpelauncher/games/com.mojang`
    : `C:\\Users\\${
        userInfo().username
      }\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang`;

const blockIds: string[] = [];

const startTime = Date.now();
console.log(chalk.bgGreenBright.black(" MCBE ") + " Starting build...");

class Addon {
  allScript: string;
  behDir: string;
  resDir: string;
  constructor({ name, description }: { name: string; description: string }) {
    this.allScript = "";

    this.resDir = baseDir + `/development_resource_packs/${name} RE`;
    this.behDir = baseDir + `/development_behavior_packs/${name} BE`;

    isExistRoute(this.behDir + "/blocks/");
    isExistRoute(this.resDir);
    CreateManifest({
      behDir: this.behDir,
      resDir: this.resDir,
      name,
      description,
    });
    return this;
  }
  addBlocks(blocks: Block[]) {
    for (const block of blocks) {
      const identifier = block.data["minecraft:block"].description.identifier;
      if (!blockIds.includes(identifier)) blockIds.push(identifier);
      else return this;

      writeFileSync(
        this.behDir + "/blocks/" + identifier.split(":")[1] + ".json",
        JSON.stringify(block.data)
      );

      this.allScript += block.script;
    }

    console.log(
      chalk.bgBlue(" MCBE ") +
        ` Build sucess all blocks to ${parseFloat(
          ((Date.now() - startTime) / 60).toString().slice(0, 4)
        )} s`
    );
    return this;
  }
  addItems(items: Item[]) {
    for (const item of items) {
      const identifier = item.data["minecraft:item"].description.identifier;
      if (!blockIds.includes(identifier)) blockIds.push(identifier);
      else return this;

      writeFileSync(
        this.behDir + "/blocks/" + identifier.split(":")[1] + ".json",
        JSON.stringify(item.data)
      );

      this.allScript += item.script;
    }

    console.log(
      chalk.bgBlue(" MCBE ") +
        ` Build sucess all items to ${parseFloat(
          ((Date.now() - startTime) / 60).toString().slice(0, 4)
        )} s`
    );
    return this;
  }
}

export { Block, Item, Sword, Addon };
