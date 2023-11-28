import chalk from 'chalk';
import urlExist from 'url-exists-nodejs';

const orgTest = 'cs204';
const orgCheck = 'cs204check';
var resTest = '';
var local = false;

import * as fs from 'node:fs/promises';
const files = await fs.readdir(process.cwd());
if(files.includes('hello.js'))
    console.log('Ok');
else
    console.log('Ups');
