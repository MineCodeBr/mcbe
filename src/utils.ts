import chalk from "chalk"
import { randomUUID } from "crypto"
import { existsSync, mkdirSync, readFile, readFileSync, writeFileSync } from "fs"

export const log = (arg: string) => console.log(`${chalk.bgBlue(" MCBE ")} ${arg}`)
export const warn = (arg: string, arg2: string) => console.log(`${chalk.bgYellow(" MCBE ")} ${arg}${arg2 ? `\n     > ${chalk.gray(arg2)}` : ""}`)
export const error = (arg: string, arg2?: string) => {
    console.log(`${chalk.bgRed(" MCBE ")} ${arg}${arg2 ? `\n     > ${chalk.gray(arg2)}` : ""}`)
    process.exit(1)
}

type Addon = {
    format_version: string
    name: string
    description: string
    namespace: string,
    build_mode: boolean
    output: {
        bh: string
        res: string
    },
    icon: string | "./pack_icon.png"
}

export const getConfig = (): Addon => {
    try {
        const code = JSON.parse(readFileSync("./manifest.config.json").toString())
        return {
            format_version: code.format_version || "1.20.20",
            name: code.name || "MCBE",
            description: code.description || "Best addon lib",
            namespace: code.namespace || "mc",
            build_mode: code.build_mode || false,
            output: {
                bh: code.output.bh || "./bh_pack",
                res: code.output.res || "./res_pack",
            },
            icon: code.icon || "./pack_icon.png"
        }
    } catch (err) {
        error(`Manifest.config.json error found`, err as string)

        process.exit(1)
    }
}

export function configManifest({ name, description, namespace, output, icon = "./pack_icon.png" }: Addon) {
    if (!name) throw "Found name on manifest.config.js"

    return { name, description, namespace, output, icon }
}

export const isExistRoute = (path: string) => { if (!existsSync(path)) mkdirSync(path, { recursive: true }) }

export function modelSavePerfomace(type: "blocks" | "entities", modelFile: { description: { identifier: string } }) {
    const filename = getConfig().output.res + "/models/" + type + "/all_block.geo.json"
    readFile(filename, (err, data) => {
        var alldata = err ? {
            "format_version": "1.12.0",
            "minecraft:geometry": []
        } : JSON.parse(data.toString())
        if (Array.isArray(alldata["minecraft:geometry"]) && alldata["minecraft:geometry"]?.find(v => v?.description?.identifier == modelFile?.description?.identifier)) return
        alldata["minecraft:geometry"].push(modelFile)

        isExistRoute(getConfig().output.res + "/models/" + type)

        writeFileSync(filename, JSON.stringify(alldata))
    })
}


export function CreateManifest() {

    isExistRoute(getConfig().output.res)
    isExistRoute(getConfig().output.bh)

    if (getConfig()?.icon) warn('Icon setting not found', '"icon": "./path/to.png" on manifest.config.json')

    readFile(getConfig()?.icon, function (err, bufferIcon) {

        var buffer
        if (!err) buffer = bufferIcon
        else buffer = readFileSync(__dirname + "/assets/grass.png")

        writeFileSync(getConfig().output.res + "/pack_icon.png", buffer)
        writeFileSync(getConfig().output.bh + "/pack_icon.png", buffer)
    })

    const devUuid = randomUUID()

    if (!existsSync(getConfig().output.res + "/manifest.json")) writeFileSync(getConfig().output.res + "/manifest.json", JSON.stringify({
        "format_version": 2,
        "header": {
            "name": getConfig().name,
            "description": getConfig().description,
            "uuid": devUuid,
            "version": [1, 0, 0],
            "min_engine_version": getConfig().format_version.split(".").map(v => Number(v))
        },
        "modules": [
            {
                "type": "resources",
                "uuid": randomUUID(),
                "version": [1, 0, 0]
            }
        ]
    }))

    if (!existsSync(getConfig().output.bh + "/manifest.json")) writeFileSync(getConfig().output.bh + "/manifest.json", JSON.stringify({
        "format_version": 2,
        "header": {
            "name": getConfig().name,
            "description": getConfig().description,
            "uuid": randomUUID(),
            "version": [1, 0, 0],
            "min_engine_version": getConfig().format_version.split(".").map(v => Number(v))
        },
        "modules": [
            {
                "uuid": randomUUID(),
                "version": [1, 0, 0],
                "type": "script",
                "language": "javascript",
                "entry": "scripts/index.js"
            }
        ],
        "dependencies": [
            {
                "module_name": "@minecraft/server",
                "version": "1.16.0"
            },
            {
                "module_name": "@minecraft/server-ui",
                "version": "1.3.0"
            },
            {
                "uuid": devUuid,
                "version": [1, 0, 0]
            }
        ],
    }))

}