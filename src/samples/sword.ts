import Item from "../models/item";

export default class Sword extends Item {
  constructor(identifier: `${string}:${string}`) {
    super(identifier);
    this.setComponent("minecraft:hand_equipped", true);
    this.setComponent("minecraft:enchantable", {
      slot: "Sword",
      value: 10,
    });
    this.setComponent("minecraft:creative_category", {
      category: "items",
      group: "minecraft:itemGroup.name.sword",
    });
    return this;
  }
  setDamage(damage: number) {
    this.setComponent("minecraft:damage", { value: damage });

    return this;
  }
}
