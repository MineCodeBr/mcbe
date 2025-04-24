# mcbe

An npm to help addon creators

## Install

```bash
npm i mcbe
```

## Example

```js
const { Block, Sword } = require("mcbe");

new Block("minecraft:sla")
  .setComponent("minecraft:display_name", "Ola")
  .setComponent("minecraft:pushable", false)
  .setComponent("minecraft:breathability", "solid")
  .onPlace((arg) => {
    console.warn("Ola");
  })
  .onTick((a) => {
    a.dimension;
  });

new Sword("mc:Ola").setDamage(100);
```

## Autocomplete

![Autocomplete](https://i.imgur.com/ZoHwOD2.png)

## [See more examples by clicking here](https://github.com/MineCodeBr/mcbe)
