#!/usr/bin/env node

const program = require('commander')
const version = require('../package.json').version
const test = require('../lib/test')
const init = require('../lib/init')
const createVueProject = require('../lib/vue')

/**
 * version
 */
program
  .version('v' + version, '-v, --version', 'output the current version')

program
  .command('test')
  .option('-n  --name <name>', 'input something')
  .action(() => {
    test()
  })

program
  .command('init')
  .action((mode, cmd) => {
    init(mode, cmd)
  })

program
  .command('create-vue <app-name>')
  .description('create a new vue project')
  .action((name, cmd) => {
    createVueProject(name, cmd)
  })

program.parse(process.argv)

/**
 * ! 未输入任何子命令现实帮助
 */
if (process.argv.length == 2) {
  program.help()
}
