export interface Options {
    build?: boolean,
    overwrite?: boolean,
}

export interface Addon {
    name: string,
    description: string,
    files: string,
    build: boolean,
    overwrite: boolean,
    dirBe: string,
    dirRe: string,
}

export interface Block {
    id: string,
    filename: string,
    source: {
        "format_version": "1.21.40",
        "minecraft:block": {
            "description": {
                "identifier": string
            },
            "components": object
        }
    },
    run: {
        lootCopy?: (v: Addon) => void,
        executeTerrainTexture?: (v: Addon) => void,
        executeGemotry?: (v: Addon) => void,
        set_custom_component?: (v: Addon) => void
    }
}

export interface Item {
    id: string,
    filename: string,
    source: object,
    baseCustomItem: string,
    allComp: string,
    run: {
        set_item_texture?: (v: Addon) => void,
        set_custom_component?: (v: Addon) => void
    }

}

export interface BlockCustomComponentsType {
    beforeOnPlayerPlace: string | undefined,
    onPlace?: string | undefined,
    onPlayerDestroy?: string | undefined,
    onPlayerInteract?: string | undefined,
    onRandomTick?: string | undefined,
    onStepOff?: string | undefined,
    onStepOn?: string | undefined,
    onTick?: string | undefined,
    onEntityFallOn?: string | undefined
}

export interface Recipe {
    id: string,
    source: {
        type: string,
        identifier: string
    },
    type: string,
    filename: string
}