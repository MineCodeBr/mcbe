import { BlockCustomComponent, ItemCustomComponent } from '@minecraft/server';

interface Options {
    build?: boolean,
    overwrite?: boolean,
}

interface Addon {
    name: string,
    description: string,
    files: string,
    build: boolean,
    overwrite: boolean,
    dirBe: string,
    dirRe: string,
}

interface Block {
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

interface Item {
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

interface Recipe {
    id: string,
    source: {
        type: string,
        identifier: string
    },
    type: string,
    filename: string
}

declare class export_default$3{
    name: string;
    description: string;
    files: string;
    build: boolean;
    overwrite: boolean;
    dirBe: string;
    dirRe: string;
    constructor(name: string, description: string, options?: Options);
    toManifestCreated(dirBe: string, dirRe?: string): this;
    addBlock(...arg: Block[]): this;
    addItem(...arg: Item[]): this;
    addRecipe(...arg: Recipe[]): this;
}

declare class export_default$2{
    id: string;
    filename: string;
    source: any;
    script: string;
    allScript: string;
    run: {
        lootCopy?: (v: Addon) => void;
        executeTerrainTexture?: (v: Addon) => void;
        executeGemotry?: (v: Addon) => void;
        set_custom_component?: (v: Addon) => void;
    };
    constructor(id: string);
    setStates(states: object): this;
    setPermutations(permutations: object[]): this;
    setComponent(name: string, value: {
        dest: string;
        loot: object;
    } | any): this;
    setMaterialTexture(data: string | object | any): this;
    setTerrainTexture(name: string, value: string, src: string): this;
    setGeometry(file: string, boneVisibility: object): this;
    setCustomComponent(customName: string, customComponent: BlockCustomComponent, options?: {
        interval_range?: number[];
        readonly looping?: boolean | false;
    } | {
        min_fall_distance?: number;
    }): this;
}

declare class export_default$1{
    id: string;
    filename: string;
    source: any;
    baseCustomItem: string;
    allComp: string;
    run: {
        set_item_texture?: (v: Addon) => void;
        set_custom_component?: (v: Addon) => void;
    };
    constructor(id: string);
    setComponent(name: string, value: string | boolean | object): this;
    setTags(...tags: string[]): this;
    setItemTexture(name: string, value: string, src: string): this;
    setCustomComponent(customName: string, customComponent: ItemCustomComponent): this;
}

declare class export_default{
    id: string;
    type: string;
    source: any;
    filename: string;
    constructor(id: string);
    setType(type: string): this;
    setTables(tables: string[]): this;
    setPattern(pattern: string[]): this;
    setKey(key: object): this;
    setResult(result: {
        item: "minecraft:air" | string;
        count: 0 | number;
    }): this;
    toJSON(): any;
}

declare const _default: {
    Addon: typeof export_default$3;
    Block: typeof export_default$2;
    Item: typeof export_default$1;
    Recipe: typeof export_default;
};

export { export_default$3 as Addon, export_default$2 as Block, export_default$1 as Item, export_default as Recipe, _default as default };
