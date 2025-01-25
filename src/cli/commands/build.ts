import { readdirSync, writeFileSync } from "fs";
import { CreateManifest, getConfig, isExistRoute } from "../../utils";
import chalk from "chalk";
import * as prettier from "prettier";
import { transform } from "@swc/core";

export default function BuildCommand(devMode: boolean = false) {
    const baseUrl = process.cwd()
    const startTime = Date.now()
    console.log(chalk.bgBlue(" MCBE ") + ` Starting Build..`)

    let scriptFileBase = `import * as mc from "@minecraft/server";import * as mcui from "@minecraft/server-ui";$globalVar;mc.world.beforeEvents.worldInitialize.subscribe(event => {$codeAdd})`

    for (const block of readdirSync("./blocks").filter(v => v.endsWith(".js") || v.endsWith(".ts"))) {
        const code = require(`${baseUrl}/blocks/${block}`)
        code.run.map((run: () => void) => run())

        isExistRoute(getConfig().output.bh + "/blocks/")
        if (devMode || getConfig().build_mode) writeFileSync(getConfig().output.bh + "/blocks/" + code.id + ".json", JSON.stringify(code.code))
        else writeFileSync(getConfig().output.bh + "/blocks/" + code.id + ".json", JSON.stringify(code.code, null, 2))

        scriptFileBase = scriptFileBase.replace("$codeAdd", `${code.scriptcode}$codeAdd`)
        scriptFileBase = scriptFileBase.replace("$globalVar", `${code.globalVar}$globalVar`)
    }

    isExistRoute(getConfig().output.bh + "/scripts/")
    if (devMode || getConfig().build_mode) {
        transform(scriptFileBase.replace("$codeAdd", "").replace("$globalVar", ""), {
            sourceMaps: false,
            isModule: true,
            minify: true,
            jsc: {
                "minify": {
                    compress: {
                        passes: 3,
                        dead_code: true,
                        drop_debugger: true,
                        drop_console: true,
                        reduce_vars: true,
                        collapse_vars: true
                    },
                    mangle: {
                        toplevel: true
                    }
                },
                parser: {
                    syntax: "ecmascript",
                },
                transform: {},
            },
        })
            .then((output) => {
                writeFileSync(getConfig().output.bh + "/scripts/" + "index.js", output.code)
            })
    } else prettier.format(scriptFileBase.replace("$codeAdd", "").replace("$globalVar", ""), { semi: false, parser: "babel" }).then((output) => {
        writeFileSync(getConfig().output.bh + "/scripts/" + "index.js", output)
    })

    CreateManifest()

    console.log(chalk.bgBlue(" MCBE ") + ` Build sucess ${parseFloat(((Date.now() - startTime) / 60).toString().slice(0, 4))} s`)
}