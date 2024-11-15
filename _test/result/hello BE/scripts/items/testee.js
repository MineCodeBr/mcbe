import * as mc from "@minecraft/server"

mc.world.beforeEvents.worldInitialize.subscribe(data => {
    data.itemComponentRegistry.registerCustomComponent("mc:test", {
        "onUseOn": () => {
            console.log("Sla")
        },
    })

})