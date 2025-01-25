import { BlockComponentOnPlaceEvent, BlockComponentPlayerDestroyEvent, BlockComponentPlayerInteractEvent, BlockComponentTickEvent } from "@minecraft/server"
import { error, getConfig, isExistRoute, modelSavePerfomace, warn } from "../utils";
import { CategoryCreative, CommumComponent, CommumEvent } from "../types"
import { readFileSync, writeFileSync } from "fs";
import chalk from "chalk";

type Block = {
    "format_version": string
    "minecraft:block": {
        "description": {
            "identifier": string
            "states": object,
            "traits": object,
            "menu_category": {
                "category": CategoryCreative | string,
                "group"?: string
                "is_hidden_in_commands"?: boolean
            }
        },
        "components": object,
        permutations: object[]
    }
}

export const BlockComponents = {
    CollisionBox: (origin: { x: number; y: number; z: number; }, size: { x: number; y: number; z: number; }) => ({ name: "minecraft:collision_box", state: { origin, size } }),
    SelectionBox: (origin: { x: number; y: number; z: number; }, size: { x: number; y: number; z: number; }) => ({ name: "minecraft:selection_box", state: { origin, size } }),
    Geometry: (value: (string | { file?: string; identifier: string, bone_visibility?: object })) => ({ name: "minecraft:geometry", state: value }),
    DisplayName: (value: string) => ({ name: "minecraft:display_name", state: value }),
    DestructibleByExplosion: (value: boolean | { "explosion_resistance": number }) => ({ name: "minecraft:destructible_by_explosion", state: value }),
    DestructibleByMining: (value: boolean | { "seconds_to_destroy": number }) => ({ name: "minecraft:destructible_by_mining", state: value }),
    LightDampening: (value: number) => ({ name: "minecraft:light_dampening", state: value }),
    LightEmission: (value: number) => ({ name: "minecraft:light_emission", state: value }),
    Loot: (value: string) => ({ name: "minecraft:loot", state: value }),
    Friction: (value: number) => ({ name: "minecraft:friction", state: value }),
    MapColor: (value: string | [number, number, number]) => ({ name: "minecraft:", state: value }),
    Transformation: (value: {
        "translation"?: [number, number, number],
        "rotation"?: [number, number, number],
        "scale"?: [number, number, number],
        "rotation_pivot"?: [number, number, number]
        "scale_pivot"?: [number, number, number]
    }) => ({ name: "minecraft:", state: value }),
    Texture: (value: {
        [key: string]: {
            texture: string,
            render_method: "alpha_test" | "alpha_test_single_sided" | "blend" | "double_sided" | "opaque",
            face_dimming?: boolean
            ambient_occlusion?: boolean
        }
    }) => ({ name: "minecraft:material_instances", state: value })
}

export const BlockEvents = {
    OnClick: (callback: (ev: BlockComponentPlayerInteractEvent) => void, name: string | boolean = false,) => ({ "id": "onPlayerInteract", option: { name }, callback: callback }),
    OnTick: (option: { interval_range: [number, number], looping?: boolean }, callback: (ev: BlockComponentTickEvent) => void, name: string | boolean = false,) => ({ "id": "onTick", option: { name, tickTime: option.interval_range, looping: option.looping }, callback: callback }),
    OnPlace: (callback: (ev: BlockComponentOnPlaceEvent) => void, name: string | boolean = false,) => ({ "id": "onPlace", option: { name }, callback: callback }),
    BlockBroken: (callback: (ev: BlockComponentPlayerDestroyEvent) => void, name: string | boolean = false,) => ({ "id": "onPlayerDestroy", option: { name }, callback: callback }),
}

export default class {
    code: Block
    id: string
    namespace: string
    scriptcode: string
    run: (() => void)[]
    globalVar: string

    constructor(id: string) {
        this.id = id
        this.globalVar = ""
        this.namespace = getConfig()?.namespace
        this.scriptcode = ""
        this.run = []
        this.code = {
            "format_version": getConfig()?.format_version,
            "minecraft:block": {
                "description": {
                    "identifier": this.namespace + ":" + id,
                    "traits": {},
                    "states": {},
                    "menu_category": {
                        "category": "Items"
                    }
                },
                "components": {
                    "minecraft:custom_components": []
                },
                permutations: []
            }
        }

        return this
    }

    setTraits(trait: object) {
        Object(this.code["minecraft:block"]?.description).traits = trait

        return this
    }

    setStates(name: string, state: [boolean, boolean] | string[] | number[] | { "values": { "min": number, "max": number } }) {
        if (Array.isArray(state) && state.length == 1) error(`[${chalk.green(this.id)}] State ${name} must have 2 values`)
        Object(this.code["minecraft:block"]?.description?.states)[name] = state
        return this
    }

    setTexturePath(name: string, value: string) {
        isExistRoute(getConfig().output.res + "/textures/blocks")
        let baseState = {
            "resource_pack_name": getConfig().name.replace(/ /g, "_").toLowerCase(),
            "texture_name": "atlas.terrain",
            "padding": 8,
            "num_mip_levels": 4,
            "texture_data": {}
        }
        try {
            const buffer = readFileSync(getConfig().output.res + "/textures/terrain_texture.json")
            baseState = JSON.parse(Object(buffer))
        } catch (e) { console.log(e) }
        Object(baseState["texture_data"])[name.replace(/ /g, "_").toLowerCase()] = {
            textures: `textures/blocks/${value.replace(/ /g, "_").toLowerCase().replace("./", "").replace(".png", "").split("/").pop()}`
        }
        writeFileSync(getConfig().output.res + `/textures/blocks/${value.replace(/ /g, "_").toLowerCase().replace("./", "").split("/").pop()}`, readFileSync(value))

        writeFileSync(getConfig().output.res + "/textures/terrain_texture.json", JSON.stringify(baseState))
        return this
    }

    setCategory(category: CategoryCreative) {
        this.code["minecraft:block"]["description"]["menu_category"]["category"] = category.toLowerCase()

        return this
    }
    setComponents(components: CommumComponent[]) {

        for (const component of components) {
            if (component.name != 'minecraft:geometry') {
                Object(this.code["minecraft:block"].components)[component.name] = component.state
                if (component.name == "minecraft:material_instances") {
                    if (!Object(component.state)["*"]) warn(`[${chalk.green(this.id)}] Material instances must have a * key`, '"*": {"texture": "block", "render_method": "alpha_test" }')
                }
            }
            else {
                if (Object(component?.state).identifier) Object(this.code["minecraft:block"].components)[component.name] = { identifier: Object(component.state).identifier }
                if (Object(component.state).file) {
                    const modelFile = JSON.parse(readFileSync(Object(component.state).file).toString())
                    if (!modelFile) return this
                    Object(this.code["minecraft:block"].components)[component.name] = {
                        identifier: modelFile?.["minecraft:geometry"][0].description.identifier,
                    }
                    this.run?.push(() => {
                        modelSavePerfomace("blocks", modelFile?.["minecraft:geometry"][0])
                    })
                }
                if (Object(component?.state).bone_visibility) Object(this.code["minecraft:block"].components)[component.name]["bone_visibility"] = Object(component.state).bone_visibility
            }
        }

        return this
    }

    setPermutation(condition: string, component: CommumComponent | CommumComponent[]) {
        this.code["minecraft:block"].permutations.push({ condition, components: component })

        return this
    }
    setPermutations(permutation: ({ condition: string, component: CommumComponent | CommumComponent[] })[]) {
        this.code["minecraft:block"].permutations = permutation

        return this
    }

    setGlobalScript(script: string) {
        this.globalVar += script
        return this
    }

    setEvents(events: CommumEvent[]) {

        for (const event of events) {
            const idEvent = String(event.option.name ? event.option.name : this.id + ":" + event.id)

            if (event.id === "onTick") {
                Object(this.code["minecraft:block"].components)["minecraft:custom_components"].push(idEvent)
                Object(this.code["minecraft:block"].components)["minecraft:tick"] = {
                    "interval_range": event.option.tickTime,
                    "looping": event.option.looping
                }
            } else {
                Object(this.code["minecraft:block"].components)["minecraft:custom_components"].push(idEvent)
            }

            this.scriptcode += `try{
                event.blockComponentRegistry.registerCustomComponent('${idEvent}',{${event.id}: (event)=> {
                try {
                     (${event.callback.toString()})(event)
                }catch(error){
                console.warn("Error on [${this.id}] event [${event.id}] "+error)
                }
                    }
                 })
                }catch(err){console.warn("Error on regitry [${event.id}] "+err)};\n`
        }


        return this
    }
}