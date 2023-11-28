#!/usr/bin/env node
import chalk from 'chalk';
import urlExist from 'url-exists-nodejs';
import fetch from 'node-fetch';
import {readdir, rm, mkdir, copyFile, writeFile } from 'node:fs/promises';
import readlineSync from 'readline-sync';
import * as child from 'node:child_process';
import * as util from 'node:util';
const exec = util.promisify(child.exec);
import * as path from 'node:path';
const orgTest = 'cs204';
const orgCheck = 'cs204check';
var resTest = '';
var local = false;
async function checkArgs() 
{
        if(process.argv.length < 3 || process.argv.length > 4)
        {
                console.log(chalk.red(`Использование: \n 
                        check204 branch/problem \n
                        или\n
                        check204 branch/problem local\n`));
                process.exit(1); 
        }
        const url2 = `https://raw.githubusercontent.com/${orgTest}/psets/${process.argv[2]}.json`;
        const url_exist = await urlExist(url2);
        if(!url_exist)
        {
                console.log(chalk.red("Неверный адрес задания"));
                process.exit(2);
        }
        if(process.argv.length == 4)
        {
                if(process.argv[3] == 'local')
                        local = true;
                else
                {
                        console.log(`Испольлзование: \n
                                check204 branch/problem local\n`)
                        process.exit(2);
                }
        }
                
};

async function getTask(psetName)
{
        try
        {
        const url2 = `https://raw.githubusercontent.com/${orgTest}/psets/${psetName}.json` 
        const res = await fetch(url2, 
        { 
                headers: 
                { 
                        "Accept": "application/json"
                 }
        })
        const res1 = await res.json();
        return res1;
        }catch(err)
        {
                console.log(err);
        }
};
async function filesExists(test)
{
        const files = await readdir(process.cwd());
        for(const file of test.files)
        {
                if(files.includes(file)) 
                {
                        console.log(chalk.green(`Файл ${file} присутствует.`));
                        resTest += `Файл ${file} присутствует.\n`;
                }
                                
                else
                {
                        console.log(chalk.red(`Файл ${file} отсутствует.`)) 
                        process.exit(1)
                }

        }
}
async function testOutput(test)
{
        const { stdout, stderr } = await exec(`${test.run}`);
        if(!stdout.localeCompare(test.output))
        {
                console.log(chalk.green('Вывод из программы верный'));
                resTest +='# Вывод из программы верный\n';
        }
        else
        {
                console.log(chalk.red('Ошибка'));
                resTest += "# Ошибка\n";
                console.log(chalk.red('Программа выдаёт'));
                resTest += '# Программа выдаёт\n';
                resTest += '<pre>\n';
                resTest += stdout.toString();
                resTest += '</pre>\n';
                console.log(stdout);
                console.log(stderr);
                console.log(chalk.red('Правильный вывод'));
                resTest += '# Правильный вывод\n';
                resTest += "<pre>";
                resTest += test.output;
                resTest += "</pre>"
                console.log(test.output);
                console.log(stderr);
        }
}
async function createDir(test)
{
        await rm('/tmp/test', {force: true, recursive: true}); 
        console.log("Folder /tmp/test deleted");
        await mkdir('/tmp/test', {recursive: true}); 
        console.log("Folder create dir");
}
async function cloneRepo(org, psetName, test)
{
        try{
        var username = readlineSync.question('Github username:');
        const origin =`git@github.com:${org}/${username}.git`;
        // const origin = `https://${username}@github.com/${org}/${username}`;
        const {stdout, stderr} = await exec(`git clone ${origin} -b main /tmp/test`);
        console.log(stdout);
        console.log(stderr);
        await exec(`git checkout -b ${psetName}`, {cwd:'/tmp/test'})
        for(let file of test.files)
        {
                await copyFile(path.join(process.cwd(), file), path.join('/tmp/test', file));
        } 
        const fileName = `/tmp/test/${psetName.split('/')[1]}.md`;
        console.log(fileName);
        await writeFile(fileName,  resTest);
        await exec(`git config user.name test && git config user.email test && git add . && git commit -m test`, {cwd: '/tmp/test'});
        await exec(`git push -f ${origin} ${psetName}`, {cwd: '/tmp/test'}); 
        }catch(error)
        {
                console.error(error)
        }
}
;(async function main()
{
        await checkArgs();
                const psetName = process.argv[2];
                const test = await getTask(psetName); 
                        await filesExists(test);
                        await testOutput(test);
        if(local)
                process.exit(0);
                        await createDir(test);
                        await cloneRepo(orgTest, psetName, test);
})()
