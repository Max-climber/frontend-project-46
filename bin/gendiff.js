#!/usr/bin/env node

import gendiff from '../src/gendiff.js';
import { Command } from 'commander';

const program = new Command();

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0', '-V, --version', 'output the version number') 
    .option('-f, --format [type]', 'output format')
    .argument('<filepath1>', 'path to the first file')
    .argument('<filepath2>', 'path to the second file')
    .helpOption('-h, --help', 'output usage information')
    .action((filepath1, filepath2, options) => {
        const format = options.format;
        const diff = gendiff(filepath1, filepath2, format);
        console.log(diff);
    })
    
    program.parse(process.argv);

gendiff()
