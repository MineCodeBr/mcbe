#! /usr/bin/env node

import { program } from "commander";
import BuildCommand from "./commands/build";
import Watch from "./commands/watch";

program.name('mcbe')
    .description('CLI para programandores de addons')
    .version('1.0.0');

program.command('build')
    .description('Comando para faze a build do seu addon')
    .option('--dev', 'Para uma versao de forma mais simples e rapido sem muito desempenho')
    .action((_, options) => {
        const args = options.parent.args
        BuildCommand(!args.includes("--dev"))

    });

program.command('watch')
    .description('Comando para faze a build do seu addon automaticamente')
    .option('--dev', 'Para uma versao de forma mais simples e rapido sem muito desempenho')
    .action((_, options) => {
        Watch(options)
    });

program.parse(process.argv);