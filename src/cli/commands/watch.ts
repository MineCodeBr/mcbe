import { readdirSync, watch, watchFile } from "fs";
import { log } from "../../utils";
import chalk from "chalk";
import { Option } from "commander";
import BuildCommand from "./build";

const watchCustom = (file: string, callback: () => void) => watchFile(file, { interval: 2000 }, (e, t) => {
    console.log('')
    console.log(`${chalk.bgGreen(" MCBE ")} Modify file ${chalk.bgBlackBright(file)}`)
    callback()
})

export default function Watch(options: any) {
    console.log(chalk.bgGreen(" MCBE ") + " Watching files")
    const args = options.parent.args

    for (const file of readdirSync("./blocks").filter(exte => exte.includes(".js"))) {
        watchCustom(`./blocks/${file}`, () => BuildCommand(!args.includes("--dev")))
    }
    for (const file of readdirSync("./items").filter(exte => exte.includes(".js"))) {
        watchCustom(`./items/${file}`, () => BuildCommand(!args.includes("--dev")))
    }

    BuildCommand(!args.includes("--dev"))
}