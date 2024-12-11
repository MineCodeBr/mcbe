#!/usr/bin/env node
import fs from "node:fs"
import { log, log_error, log_warn } from "../src/utils"
import clc from 'cli-color'
import { Addon } from "../index"
const baseUrl = process.cwd()

const arg = process.argv


if (!arg[2] || arg[2] === "help") {
    log('Simple cli of Minecraft Bedrock [BETA]')
    console.log(`
 ${clc.bgBlack('Example: mcbe [command] [option]')}
 Commands
    help - Guia da cli
    init - Cria uma simples base para sua criacao de addon
    build - Cria uma build de seus codigos
    run - Executa de forma mais rapido e mais pesada
`)
}



if (arg[2] === "run" || arg[2] === "build") {
    if (!fs.existsSync('./config.json')) log_error(`Not found ${clc.bgBlack(' config.json ')}`)

    const { name, description, compile = { outPutBeh: name, outPutRes: undefined } } = JSON.parse(String(fs.readFileSync('./config.json')))
    const addon = new Addon(name, description, arg[2] === "build" ? { build: true, overwrite: true } : {})
    if (arg[2] === "build") {
        fs.rmSync(compile.outPutBeh + " BE", { recursive: true, force: true })
        fs.rmSync(compile.outPutRes + " RE", { recursive: true, force: true })
    }
    addon.toManifestCreated(compile.outPutBeh, compile.outPutRes)

    if (fs.existsSync('./items')) {
        fs.readdirSync('./items').map(async (file) => {
            const item = require(baseUrl + `/items/${file}`)
            addon.addItem(item)
        })
    }
    if (fs.existsSync('./blocks')) {
        fs.readdirSync('./blocks').map(async (file) => {
            const item = require(baseUrl + `/blocks/${file}`)
            addon.addBlock(item)
        })
    }

    if (arg[2] === "build") log_warn(clc.yellow("BUILD"), "Sucess")
}