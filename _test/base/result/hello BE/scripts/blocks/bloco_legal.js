import * as mc from "@minecraft/server";
mc.world.beforeEvents.worldInitialize.subscribe(data => {
  data.blockComponentRegistry.registerCustomComponent("sla", {
    onTick(t) {
      t.block
    },
    onEntityFallOn(arg) {
      arg.block
    }
  })
})