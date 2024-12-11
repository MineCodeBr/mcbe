export default class {
    id: string;
    type: string;
    source: any;
    filename: string;

    constructor(id: string) {
        this.type = ""
        this.filename = id.split(":")[1]
        this.id = id
        this.source = {
            "minecraft:recipe_shaped": {
                "tags": [],
                "pattern": []
            }
        }
    }
    setType(type: string) {
        this.type = type
        return this
    }
    setTables(tables: string[]) {
        this.source["minecraft:recipe_shaped"].tags = tables
        return this
    }
    setPattern(pattern: string[]) {
        this.source["minecraft:recipe_shaped"].pattern = pattern
        return this
    }
    setKey(key: object) {
        this.source["minecraft:recipe_shaped"].key = key
        return this
    }
    setResult(result: { item: "minecraft:air" | string, count: 0 | number }) {
        this.source["minecraft:recipe_shaped"].result = result

        return this
    }
    toJSON() {
        return this.source
    }


};
