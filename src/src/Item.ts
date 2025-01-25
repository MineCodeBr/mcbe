import { ItemComponentBeforeDurabilityDamageEvent, ItemComponentHitEntityEvent, ItemComponentMineBlockEvent } from "@minecraft/server"
import { CategoryCreative, CommumComponent, CommumEvent } from "../types"
import { getConfig } from "../utils"

interface Item {
    "format_version": string
    "minecraft:item": {
        "description": {
            "identifier": string
            "menu_category": {
                "category": CategoryCreative | string,
            }
        }
        "components": object
    }
}

export const ItemComponents = {
    DisplayName: (value: string) => ({ name: "minecraft:display_name", state: value }),
    MaxStackSize: (value: number) => ({ name: "minecraft:max_stack_size", state: value })
}

export const ItemEvents = {
    BeforeDurabilityDamage: (callback: (ev: ItemComponentBeforeDurabilityDamageEvent) => void, name: string | boolean = false,) => ({ "id": "onBeforeDurabilityDamage", option: { name }, callback: callback }),
    HitEntity: (callback: (ev: ItemComponentHitEntityEvent) => void, name: string | boolean = false,) => ({ "id": "onHitEntity", option: { name }, callback: callback }),
    MineBlock: (callback: (ev: ItemComponentMineBlockEvent) => void, name: string | boolean = false,) => ({ "id": "onMineBlock", option: { name }, callback: callback }),
}

export default class {
    code: Item
    id: string
    namespace: string
    scriptcode: string


    constructor(id: string) {
        this.id = id
        this.namespace = getConfig()?.namespace
        this.scriptcode = ""
        this.code = {
            "format_version": getConfig()?.format_version,
            "minecraft:item": {
                "description": {
                    "identifier": this.namespace + ":" + id,
                    "menu_category": {
                        "category": "items"
                    }
                },
                "components": {}
            },
        }

        return this
    }
    setCategory(category: CategoryCreative) {
        this.code["minecraft:item"]["description"]["menu_category"]["category"] = category.toLowerCase()

        return this
    }

    setComponents(components: CommumComponent[]) {
        for (const component of components) {
            Object(this.code["minecraft:item"].components)[component.name] = component.state
        }

        return this
    }

    setEvents(events: CommumEvent[]) {
        for (const event of events) {
            const idEvent = String(event.option.name ? event.option.name : this.id + ":" + event.id)
            Object(this.code["minecraft:item"].components)["minecraft:custom_components"].push(idEvent)


            this.scriptcode +=
                `try {
            event.blockComponentRegistry.registerCustomComponent('${idEvent}',{${event.id}: (event)=> {
                try {
                     (${event.callback.toString()})(event)
                } catch (error){
                console.warn("Error on [${this.id}] event [${event.id}] "+error)
                }
                    }
                 })
                }catch(err){console.warn("Error on regitry [${event.id}] "+err)};\n`
        }

        return this
    }

}