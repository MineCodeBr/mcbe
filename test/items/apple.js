const { Item, ItemComponents, ItemEvents } = require("../../src")

module.exports = new Item("apple")
    .setComponents([
        ItemComponents.DisplayName("Apple"),
        ItemComponents.MaxStackSize(64),
    ])
    .setEvents([
        ItemEvents.MineBlock((ev) => {

        }),
    ])
