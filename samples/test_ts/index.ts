import { Addon } from "../../src/index";
import Stone from "./blocks/stone";
import Apple from "./items/apple_sword";

new Addon({
  name: "Addon Xd",
  description: "Best addon",
})
  .addBlocks([Stone.toJSON()])
  .addItems([Apple.toJSON()]);
