import { Block } from "../../../src/index";

export default new Block("mc:stone")
  .setComponent("minecraft:display_name", "Ola")
  .setComponent("minecraft:pushable", false)
  .setComponent("minecraft:breathability", "solid")
  .onPlace((arg) => {
    console.warn("Hello");
  })
  .onTick((a) => {
    a.dimension;
  });
