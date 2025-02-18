#!/usr/bin/env node

import gendiff from '../src/gendiff.js';
import { program } from 'commander';

program
.name('gendiff')
.description('compare files and shows a difference')
.version('1.0.0', '-V, --version', 'output the version number') 
.helpOption('-h, --help', 'show info')
.parse(process.argv);

gendiff();